import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  CodeAction,
  CodeActionKind,
  CodeLens,
  Command,
  TextEdit,
  type Connection,
} from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { generateCurrentReport, generateMainReport } from "../../../vscode/src/commands/report-generator/reportGenerator";
import { Configs, Settings } from "../../../vscode/src/config";
import { DependencyCache } from "../../../vscode/src/core/listeners/listener";
import { CurrentLanguage, Language, setLanguage } from "../../../vscode/src/core/Language";
import { isPinnedCargoVersion } from "../../../vscode/src/core/cargoUtils";
import type { Analysis } from "./analyze";
import { canUpdate, preservePrefix, type PreparedDep } from "./present";
import { VsCodeDocument } from "./document";
import { editorContext, setActiveDocument, Uri, workspace } from "./shims/vscode";

export const COMMAND = {
  REPLACE_VERSION: Configs.REPLACE_VERSIONS,
  RETRY: Configs.RETRY,
  UPDATE_ALL: Configs.UPDATE_ALL,
  VULN_REPORT: Configs.GENERATE_VULNERABILITY_REPORT,
  VULN_CURRENT: Configs.GENERATE_VULNERABILITY_CURRENT_REPORT,
  ENABLE_LOCK: Configs.ENABLE_LOCK_FILE_PARSING,
  DISABLE_LOCK: Configs.DISABLE_LOCK_FILE_PARSING,
  LOCK_PARSED: Configs.LOCK_FILE_PARSED,
} as const;

export const ALL_COMMANDS = Object.values(COMMAND);

export const KIND = {
  UPDATE_ONE: "quickfix.dependi.update",
  UPDATE_ALL: "source.dependi.updateAll",
  RETRY: "source.dependi.retry",
  VULN_REPORT: "source.dependi.vulnerability.report",
  VULN_CURRENT: "source.dependi.vulnerability.currentReport",
  ENABLE_LOCK: "source.dependi.enableLockFileParsing",
  DISABLE_LOCK: "source.dependi.disableLockFileParsing",
  LOCK_PARSED: "source.dependi.lockFileParsed",
} as const;

export const SOURCE_KINDS = [
  CodeActionKind.QuickFix,
  CodeActionKind.Source,
  KIND.UPDATE_ONE,
  KIND.UPDATE_ALL,
  KIND.RETRY,
  KIND.VULN_REPORT,
  KIND.VULN_CURRENT,
  KIND.ENABLE_LOCK,
  KIND.DISABLE_LOCK,
  KIND.LOCK_PARSED,
];

export type CommandCache = {
  analysis?: Analysis;
  prepared: PreparedDep[];
};

export type CommandHost = {
  connection: Connection;
  getCache: (uri: string) => CommandCache | undefined;
  getDocument: (uri: string) => TextDocument | undefined;
  analyze: (document: TextDocument) => Promise<void>;
};

type UriArg = { uri?: string };

function toFsPath(uri: string): string {
  try {
    return Uri.parse(uri).fsPath;
  } catch {
    return uri;
  }
}

function fileNameOf(uri: string): string {
  return path.basename(toFsPath(uri));
}

function lockConfigKey(language: Language): string | undefined {
  switch (language) {
    case Language.Rust:
      return Configs.RUST_ENABLED_LOCK_FILE;
    case Language.JS:
      return Configs.NPM_ENABLED_LOCK_FILE;
    case Language.PHP:
      return Configs.PHP_ENABLED_LOCK_FILE;
    case Language.Python:
      return Configs.PYTHON_ENABLED_LOCK_FILE;
    case Language.Dart:
      return Configs.DART_ENABLED_LOCK_FILE;
    case Language.CSharp:
      return Configs.CSHARP_ENABLED_LOCK_FILE;
    case Language.Elixir:
      return Configs.ELIXIR_ENABLED_LOCK_FILE;
    default:
      return undefined;
  }
}

function supportsLockToggle(uri: string): boolean {
  const filename = fileNameOf(uri);
  if (filename === "go.mod" || filename.toLowerCase().startsWith("requirement")) {
    return false;
  }
  setLanguage(toFsPath(uri));
  return Boolean(lockConfigKey(CurrentLanguage));
}

function lockEnabled(language: Language): boolean {
  switch (language) {
    case Language.Rust:
      return Settings.rust.lockFileEnabled;
    case Language.JS:
      return Settings.npm.lockFileEnabled;
    case Language.PHP:
      return Settings.php.lockFileEnabled;
    case Language.Python:
      return Settings.python.lockFileEnabled;
    case Language.Dart:
      return Settings.dart.lockFileEnabled;
    case Language.CSharp:
      return Settings.csharp.lockFileEnabled;
    case Language.Elixir:
      return Settings.elixir.lockFileEnabled;
    default:
      return false;
  }
}

function command(title: string, id: string, uri: string): Command {
  return { title, command: id, arguments: [{ uri }] };
}

function commandAction(title: string, kind: string, id: string, uri: string): CodeAction {
  return {
    title,
    kind,
    command: command(title, id, uri),
  };
}

export function updateAllEdits(document: TextDocument, entry: CommandCache): TextEdit[] {
  const language = entry.analysis?.language;
  if (!language) {
    return [];
  }
  const updates: TextEdit[] = [];
  for (const item of entry.analysis?.updateAll ?? []) {
    const dep = entry.prepared.find(
      (prepared) =>
        prepared.dependency.item.key === item.key &&
        prepared.dependency.item.range.start.line === item.startLine
    )?.dependency;
    if (!dep?.versions?.[0] || !canUpdate(dep, language)) {
      continue;
    }
    const range = dep.item.range;
    const currentText = document.getText({
      start: { line: range.start.line, character: range.start.character },
      end: { line: range.end.line, character: range.end.character },
    });
    if (language === Language.Rust && isPinnedCargoVersion(currentText.trim())) {
      continue;
    }
    updates.push(
      TextEdit.replace(
        {
          start: { line: range.start.line, character: range.start.character },
          end: { line: range.end.line, character: range.end.character },
        },
        preservePrefix(currentText, dep.versions[0])
      )
    );
  }
  return updates;
}

export function oneDepUpdates(document: TextDocument, entry: CommandCache, range: { start: { line: number }; end: { line: number } }): CodeAction[] {
  const language = entry.analysis?.language;
  if (!language) {
    return [];
  }
  const actions: CodeAction[] = [];
  for (const item of entry.prepared) {
    const dep = item.dependency;
    const depRange = dep.item.range;
    const overlaps =
      depRange.start.line <= range.end.line && depRange.end.line >= range.start.line;
    if (!overlaps || !canUpdate(dep, language)) {
      continue;
    }
    if (language === Language.Rust && isPinnedCargoVersion(dep.item.value)) {
      continue;
    }
    const currentText = document.getText({
      start: { line: depRange.start.line, character: depRange.start.character },
      end: { line: depRange.end.line, character: depRange.end.character },
    });
    const rangeEdit = {
      start: { line: depRange.start.line, character: depRange.start.character },
      end: { line: depRange.end.line, character: depRange.end.character },
    };
    const versions = dep.versions!.slice(0, 12);
    for (const [index, version] of versions.entries()) {
      if (preservePrefix(currentText, version) === currentText) {
        continue;
      }
      const vulnCount = dep.vulns?.get(version)?.length ?? 0;
      const vulnSuffix = vulnCount > 0 ? `  🚨 ${vulnCount}` : "";
      actions.push({
        title: `${index === 0 ? "Update" : "Use"} ${dep.item.key} to ${version}${vulnSuffix}`,
        kind: KIND.UPDATE_ONE,
        isPreferred: index === 0,
        edit: {
          changes: {
            [document.uri]: [TextEdit.replace(rangeEdit, preservePrefix(currentText, version))],
          },
        },
      });
    }
  }
  return actions;
}

export function sourceActions(document: TextDocument, entry?: CommandCache): CodeAction[] {
  const uri = document.uri;
  const actions: CodeAction[] = [
    commandAction("Dependi: Retry to fetch dependencies", KIND.RETRY, COMMAND.RETRY, uri),
    commandAction(
      "Dependi: Generate vulnerability report for current dependencies",
      KIND.VULN_CURRENT,
      COMMAND.VULN_CURRENT,
      uri
    ),
    commandAction(
      "Dependi: Generate vulnerability report compared to latest commit",
      KIND.VULN_REPORT,
      COMMAND.VULN_REPORT,
      uri
    ),
  ];

  const updates = entry ? updateAllEdits(document, entry) : [];
  if (updates.length > 0) {
    actions.unshift({
      title: `Dependi: Update All dependencies to latest version (${updates.length})`,
      kind: KIND.UPDATE_ALL,
      edit: { changes: { [uri]: updates } },
    });
  }

  if (supportsLockToggle(uri)) {
    const enabled = lockEnabled(CurrentLanguage);
    const hasLockFile = Boolean(editorContext["dependi.hasLockFile"]);
    if (hasLockFile) {
      actions.push(
        commandAction("Dependi: Disable Lock File Parsing", KIND.LOCK_PARSED, COMMAND.LOCK_PARSED, uri)
      );
    } else if (enabled) {
      actions.push(
        commandAction("Dependi: Disable Lock File Parsing", KIND.DISABLE_LOCK, COMMAND.DISABLE_LOCK, uri)
      );
    } else {
      actions.push(
        commandAction("Dependi: Enable Lock File Parsing", KIND.ENABLE_LOCK, COMMAND.ENABLE_LOCK, uri)
      );
    }
  }

  return actions;
}

export function codeLenses(uri: string, entry?: CommandCache): CodeLens[] {
  const range = { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } };
  const lenses: CodeLens[] = [
    { range, command: command("Dependi: Retry", COMMAND.RETRY, uri) },
    {
      range,
      command: command("Dependi: Current vuln report", COMMAND.VULN_CURRENT, uri),
    },
    {
      range,
      command: command("Dependi: Compare vuln report", COMMAND.VULN_REPORT, uri),
    },
  ];
  if (entry && updateAllEditsPlaceholder(entry)) {
    lenses.unshift({ range, command: command("Dependi: Update All", COMMAND.UPDATE_ALL, uri) });
  }
  if (supportsLockToggle(uri)) {
    const enabled = lockEnabled(CurrentLanguage);
    const hasLockFile = Boolean(editorContext["dependi.hasLockFile"]);
    if (hasLockFile || enabled) {
      lenses.push({
        range,
        command: command(
          "Dependi: Disable lock file",
          hasLockFile ? COMMAND.LOCK_PARSED : COMMAND.DISABLE_LOCK,
          uri
        ),
      });
    } else {
      lenses.push({
        range,
        command: command("Dependi: Enable lock file", COMMAND.ENABLE_LOCK, uri),
      });
    }
  }
  return lenses;
}

function updateAllEditsPlaceholder(entry: CommandCache): boolean {
  return Boolean(entry.analysis?.updateAll?.length);
}

async function applyEdits(host: CommandHost, uri: string, edits: TextEdit[]): Promise<void> {
  if (edits.length === 0) {
    host.connection.window.showInformationMessage("Dependi: no updatable dependencies found");
    return;
  }
  await host.connection.workspace.applyEdit({ changes: { [uri]: edits } });
}

async function prepareDocument(host: CommandHost, uri: string): Promise<TextDocument | undefined> {
  const document = host.getDocument(uri);
  if (!document) {
    host.connection.window.showErrorMessage("Dependi: open a supported manifest file first");
    return undefined;
  }
  setLanguage(toFsPath(uri));
  setActiveDocument(new VsCodeDocument(document));
  return document;
}

async function toggleLockFile(host: CommandHost, uri: string, enabled: boolean): Promise<void> {
  const document = await prepareDocument(host, uri);
  if (!document) {
    return;
  }
  const key = lockConfigKey(CurrentLanguage);
  if (!key) {
    host.connection.window.showInformationMessage("Dependi: lock file parsing is not used for this file");
    return;
  }
  await workspace.getConfiguration("dependi").update(key, enabled);
  Settings.load();
  editorContext["dependi.isLockFileEnabled"] = enabled;
  if (!enabled) {
    editorContext["dependi.hasLockFile"] = false;
  }
  await host.analyze(document);
  host.connection.window.showInformationMessage(
    `Dependi: lock file parsing ${enabled ? "enabled" : "disabled"} for this session. Persist with lsp.dependi.settings.${key} in settings.json.`
  );
}

async function openHtmlReport(host: CommandHost, html: string, label: string): Promise<void> {
  const file = path.join(tmpdir(), `dependi-${label}-${Date.now()}.html`);
  writeFileSync(file, html, "utf8");
  const uri = pathToFileURL(file).toString();
  try {
    const shown = await host.connection.window.showDocument({ uri, external: true, takeFocus: true });
    if (!shown) {
      host.connection.window.showInformationMessage(`Dependi: vulnerability report saved to ${file}`);
    }
  } catch {
    host.connection.window.showInformationMessage(`Dependi: vulnerability report saved to ${file}`);
  }
}

async function generateReport(
  host: CommandHost,
  uri: string,
  compared: boolean
): Promise<void> {
  const document = await prepareDocument(host, uri);
  if (!document) {
    return;
  }
  const dummyProgress = { report: () => {} };
  try {
    const html = compared
      ? await generateMainReport(dummyProgress)
      : await generateCurrentReport(dummyProgress);
    if (!html) {
      return;
    }
    await openHtmlReport(host, html, compared ? "compare" : "current");
  } catch (error) {
    host.connection.window.showErrorMessage(`Dependi: report generation failed: ${error}`);
  }
}

export async function executeCommand(
  host: CommandHost,
  command: string,
  args: unknown[]
): Promise<void> {
  const uri = (args[0] as UriArg | undefined)?.uri || (typeof args[0] === "string" ? args[0] : undefined);
  if (!uri && command !== COMMAND.REPLACE_VERSION) {
    host.connection.window.showErrorMessage("Dependi: no active document");
    return;
  }

  switch (command) {
    case COMMAND.RETRY: {
      const document = await prepareDocument(host, uri!);
      if (!document) {
        return;
      }
      DependencyCache.delete(CurrentLanguage);
      await host.analyze(document);
      host.connection.window.showInformationMessage("Dependi: refetching dependencies");
      return;
    }
    case COMMAND.UPDATE_ALL: {
      const document = await prepareDocument(host, uri!);
      if (!document) {
        return;
      }
      const entry = host.getCache(uri!);
      if (!entry) {
        host.connection.window.showInformationMessage("Dependi: still analyzing, try again in a moment");
        return;
      }
      await applyEdits(host, uri!, updateAllEdits(document, entry));
      return;
    }
    case COMMAND.REPLACE_VERSION: {
      let data: { uri?: string; key?: string; version?: string; startLine?: number } | undefined;
      try {
        const raw = args[0];
        data = typeof raw === "string" ? JSON.parse(decodeURIComponent(raw)) : raw;
      } catch {
        data = undefined;
      }
      const documentUri = data?.uri || uri;
      if (!data || !documentUri || data.key === undefined || data.version === undefined || data.startLine === undefined) {
        return;
      }
      const document = await prepareDocument(host, documentUri);
      const entry = host.getCache(documentUri);
      const dep = entry?.prepared.find(
        (item) =>
          item.dependency.item.key === data.key &&
          item.dependency.item.range.start.line === data.startLine
      )?.dependency;
      if (!document || !dep) {
        return;
      }
      if (entry?.analysis?.language === Language.Rust && isPinnedCargoVersion(dep.item.value)) {
        return;
      }
      const range = dep.item.range;
      const currentText = document.getText({
        start: { line: range.start.line, character: range.start.character },
        end: { line: range.end.line, character: range.end.character },
      });
      await applyEdits(host, documentUri, [
        TextEdit.replace(
          {
            start: { line: range.start.line, character: range.start.character },
            end: { line: range.end.line, character: range.end.character },
          },
          preservePrefix(currentText, data.version)
        ),
      ]);
      return;
    }
    case COMMAND.VULN_CURRENT:
      await generateReport(host, uri!, false);
      return;
    case COMMAND.VULN_REPORT:
      await generateReport(host, uri!, true);
      return;
    case COMMAND.ENABLE_LOCK:
      await toggleLockFile(host, uri!, true);
      return;
    case COMMAND.DISABLE_LOCK:
    case COMMAND.LOCK_PARSED:
      await toggleLockFile(host, uri!, false);
      return;
    default:
      break;
  }
}
