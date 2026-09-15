import {
  CompletionItem,
  CompletionItemKind,
  Diagnostic,
  DiagnosticSeverity,
  Hover,
  InlayHint,
  MarkupKind,
  ProposedFeatures,
  TextDocumentSyncKind,
  TextDocuments,
  TextEdit,
  createConnection,
  type TextDocumentPositionParams,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Settings } from "../../../vscode/src/config";
import { analyzeDocument, isManifestFile, type Analysis } from "./analyze";
import {
  ALL_COMMANDS,
  SOURCE_KINDS,
  codeLenses,
  executeCommand,
  oneDepUpdates,
  sourceActions,
  type CommandHost,
} from "./commands";
import { VsCodeDocument } from "./document";
import { prepareDependencies, preservePrefix, type PreparedDep } from "./present";
import { applyLspSettings } from "./settings";
import { Uri, setMessageHandlers, setWorkspaceFolders, registerGitExtension } from "./shims/vscode";
import { gitExtensionFor } from "./shims/git";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

setMessageHandlers({
  error: (message) => {
    void connection.window.showErrorMessage(message);
  },
  info: (message) => {
    void connection.window.showInformationMessage(message);
  },
});
registerGitExtension(() => gitExtensionFor());

type CacheEntry = {
  version: number;
  analysis?: Analysis;
  prepared: PreparedDep[];
  running?: Promise<void>;
};

const cache = new Map<string, CacheEntry>();
const timers = new Map<string, NodeJS.Timeout>();
let analyzeQueue: Promise<void> = Promise.resolve();

connection.onInitialize((params) => {
  const init = params.initializationOptions;
  if (init && typeof init === "object" && !Array.isArray(init)) {
    applyLspSettings(init as Record<string, unknown>);
  } else {
    applyLspSettings({});
  }
  setWorkspaceFolders(params.workspaceFolders ?? undefined, params.rootUri);
  process.stderr.write("[dependi] language server initialized\n");
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      hoverProvider: true,
      inlayHintProvider: {
        resolveProvider: false,
      },
      codeActionProvider: {
        codeActionKinds: SOURCE_KINDS,
      },
      executeCommandProvider: {
        commands: ALL_COMMANDS,
      },
      codeLensProvider: {
        resolveProvider: false,
      },
      completionProvider: {
        triggerCharacters: ['"', "'", ".", "^", "~", ">", "<", "="],
      },
      workspace: {
        workspaceFolders: {
          supported: true,
          changeNotifications: true,
        },
      },
    },
  };
});

connection.onInitialized(async () => {
  try {
    const settings = await Promise.race([
      connection.workspace.getConfiguration(),
      new Promise<Record<string, unknown>>((resolve) => setTimeout(() => resolve({}), 750)),
    ]);
    if (settings && typeof settings === "object") {
      applyLspSettings(settings as Record<string, unknown>);
    }
  } catch {
    // keep initializationOptions / defaults
  }
});

connection.onDidChangeConfiguration(async (change) => {
  const settings =
    change.settings && typeof change.settings === "object"
      ? (change.settings as Record<string, unknown>)
      : undefined;
  if (settings) {
    applyLspSettings(settings);
  } else {
    try {
      const fetched = await connection.workspace.getConfiguration();
      if (fetched && typeof fetched === "object") {
        applyLspSettings(fetched as Record<string, unknown>);
      }
    } catch {
      // keep current settings
    }
  }
  for (const document of documents.all()) {
    scheduleAnalyze(document, 50);
  }
});

documents.onDidOpen((event) => scheduleAnalyze(event.document, 0));
documents.onDidChangeContent((event) => scheduleAnalyze(event.document, 250));
documents.onDidClose((event) => {
  const uri = event.document.uri;
  const timer = timers.get(uri);
  if (timer) {
    clearTimeout(timer);
    timers.delete(uri);
  }
  cache.delete(uri);
  connection.sendDiagnostics({ uri, diagnostics: [] });
});

function logInfo(message: string): void {
  connection.console.info(message);
  process.stderr.write(`[dependi] ${message}\n`);
}

function logError(message: string): void {
  connection.console.error(message);
  process.stderr.write(`[dependi] ${message}\n`);
}

function scheduleAnalyze(document: TextDocument, delay: number): void {
  const previous = timers.get(document.uri);
  if (previous) {
    clearTimeout(previous);
  }
  const timer = setTimeout(() => {
    timers.delete(document.uri);
    void runAnalyze(document);
  }, delay);
  timers.set(document.uri, timer);
}

async function runAnalyze(document: TextDocument): Promise<void> {
  const job = analyzeQueue.then(() => runAnalyzeExclusive(document));
  analyzeQueue = job.catch(() => {});
  await job;
}

async function runAnalyzeExclusive(document: TextDocument): Promise<void> {
  if (!isManifestFile(toFsPath(document.uri))) {
    cache.delete(document.uri);
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    return;
  }

  const current = cache.get(document.uri);
  const version = document.version;
  const work = (async () => {
    try {
      const wrapped = new VsCodeDocument(document);
      const analysis = await analyzeDocument(wrapped);
      if (documents.get(document.uri)?.version !== version) {
        return;
      }
      const prepared = analysis ? prepareDependencies(analysis, document.uri) : [];
      const vulnHints = prepared.filter((item) =>
        (item.dependency.vulns instanceof Map
          ? [...item.dependency.vulns.values()]
          : Object.values((item.dependency.vulns ?? {}) as Record<string, string[]>)
        ).some((ids) => ids.length > 0)
      ).length;
      cache.set(document.uri, { version, analysis, prepared });
      logInfo(
        `analyzed ${toFsPath(document.uri)} (${prepared.length} dependencies, ${vulnHints} with vulns)`
      );
      connection.sendDiagnostics({
        uri: document.uri,
        diagnostics: diagnosticsFor(prepared),
      });
    } catch (error) {
      const detail = error instanceof Error ? `${error.message}\n${error.stack}` : String(error);
      logError(`analyze failed: ${detail}`);
    }
  })();

  cache.set(document.uri, {
    version,
    analysis: current?.analysis,
    prepared: current?.prepared ?? [],
    running: work,
  });
  await work;
  // Do not await refresh: Zed may still be blocked on this inlay-hint
  // request, and waiting here deadlocks the language server.
  void connection.languages.inlayHint.refresh().catch(() => {});
  void connection.sendRequest("workspace/codeLens/refresh").catch(() => {});
}

function toFsPath(uri: string): string {
  try {
    return Uri.parse(uri).fsPath;
  } catch {
    return uri;
  }
}

function diagnosticsFor(prepared: PreparedDep[]): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  for (const item of prepared) {
    const dep = item.dependency;
    const range = {
      start: { line: dep.item.range.start.line, character: dep.item.range.start.character },
      end: { line: dep.item.range.end.line, character: dep.item.range.end.character },
    };
    const version = dep.item.value ?? "";
    const vulns = dep.vulns?.get(dep.item.lockedAt ?? version) ?? [];
    if (vulns.length > 0) {
      diagnostics.push({
        range,
        severity: DiagnosticSeverity.Warning,
        source: "dependi",
        message: `${dep.item.key} has ${vulns.length} known vulnerabilit${vulns.length === 1 ? "y" : "ies"}: ${vulns.join(", ")}`,
      });
    }
    if (item.kind === "ERROR" && dep.error) {
      diagnostics.push({
        range,
        severity: DiagnosticSeverity.Information,
        source: "dependi",
        message: dep.error,
      });
    }
  }
  return diagnostics;
}

function cached(uri: string): CacheEntry | undefined {
  return cache.get(uri);
}

function hintsFor(entry: CacheEntry | undefined): InlayHint[] {
  if (!entry?.prepared.length) {
    return [];
  }
  const hints: InlayHint[] = [];
  for (const item of entry.prepared) {
    if (!item.label) {
      continue;
    }
    const after = Settings.decorator.position !== "before";
    const range = item.dependency.item.decoRange ?? item.dependency.item.range;
    const position = after
      ? { line: range.end.line, character: range.end.character }
      : { line: item.dependency.item.line, character: 0 };
    hints.push({
      position,
      label: item.label,
      paddingLeft: after,
      paddingRight: !after,
      tooltip: { kind: MarkupKind.Markdown, value: item.hover },
    });
  }
  return hints;
}

async function waitForAnalysis(uri: string): Promise<CacheEntry | undefined> {
  const document = documents.get(uri);
  if (!document || !isManifestFile(toFsPath(uri))) {
    return cache.get(uri);
  }
  const entry = cache.get(uri);
  if (entry?.running) {
    await entry.running;
  }
  const latest = cache.get(uri);
  if (latest && latest.version === document.version && (latest.prepared.length > 0 || latest.analysis)) {
    return latest;
  }
  await runAnalyze(document);
  return cache.get(uri);
}

connection.languages.inlayHint.on(async (params) => {
  const entry = await waitForAnalysis(params.textDocument.uri);
  const hints = hintsFor(entry);
  logInfo(`inlay hints ${toFsPath(params.textDocument.uri)}: ${hints.length}`);
  return hints;
});

connection.onHover(async (params: TextDocumentPositionParams): Promise<Hover | null> => {
  await waitForAnalysis(params.textDocument.uri);
  const item = depAt(params);
  if (!item) {
    return null;
  }
  return {
    contents: { kind: MarkupKind.Markdown, value: item.hover },
    range: {
      start: {
        line: item.dependency.item.range.start.line,
        character: item.dependency.item.range.start.character,
      },
      end: {
        line: item.dependency.item.range.end.line,
        character: item.dependency.item.range.end.character,
      },
    },
  };
});

connection.onCompletion((params) => {
  const document = documents.get(params.textDocument.uri);
  const entry = cached(params.textDocument.uri);
  if (!document || !entry?.prepared.length) {
    return [];
  }
  const item = depAt(params);
  if (!item) {
    return [];
  }
  const versions = item.dependency.versions ?? [];
  return versions.slice(0, 50).map((version, index): CompletionItem => ({
    label: version,
    kind: CompletionItemKind.Value,
    sortText: String(index).padStart(4, "0"),
    detail: index === 0 ? "latest" : undefined,
    textEdit: TextEdit.replace(
      {
        start: {
          line: item.dependency.item.range.start.line,
          character: item.dependency.item.range.start.character,
        },
        end: {
          line: item.dependency.item.range.end.line,
          character: item.dependency.item.range.end.character,
        },
      },
      preservePrefix(
        document.getText({
          start: {
            line: item.dependency.item.range.start.line,
            character: item.dependency.item.range.start.character,
          },
          end: {
            line: item.dependency.item.range.end.line,
            character: item.dependency.item.range.end.character,
          },
        }),
        version
      )
    ),
  }));
});

connection.onCodeAction((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document || !isManifestFile(toFsPath(document.uri))) {
    return [];
  }
  const entry = cached(params.textDocument.uri);
  const actions = sourceActions(document, entry);
  if (entry) {
    actions.unshift(...oneDepUpdates(document, entry, params.range));
  }
  return actions;
});

const host: CommandHost = {
  connection,
  getCache: (uri) => cache.get(uri),
  getDocument: (uri) => documents.get(uri),
  analyze: (document) => runAnalyze(document),
};

connection.onExecuteCommand(async (params) => {
  await executeCommand(host, params.command, params.arguments ?? []);
});

connection.onCodeLens((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document || !isManifestFile(toFsPath(document.uri))) {
    return [];
  }
  return codeLenses(document.uri, cached(document.uri));
});

function depAt(params: TextDocumentPositionParams): PreparedDep | undefined {
  const entry = cached(params.textDocument.uri);
  if (!entry) {
    return undefined;
  }
  return entry.prepared.find((item) => {
    const start = item.dependency.item.range.start;
    const end = item.dependency.item.decoRange.end;
    if (params.position.line < start.line || params.position.line > end.line) {
      return false;
    }
    if (params.position.line === start.line && params.position.character < Math.max(0, start.character - 40)) {
      return false;
    }
    return true;
  });
}

documents.listen(connection);
connection.listen();
