/**
 * Minimal vscode API surface so vscode/src parsers, fetchers, and config can
 * run inside the Dependi language server.
 */
import { fileURLToPath, pathToFileURL } from "node:url";

export class Position {
  constructor(
    public line: number,
    public character: number
  ) {}

  isEqual(other: Position): boolean {
    return this.line === other.line && this.character === other.character;
  }

  compareTo(other: Position): number {
    if (this.line < other.line) return -1;
    if (this.line > other.line) return 1;
    return this.character - other.character;
  }

  translate(lineDelta = 0, characterDelta = 0): Position {
    return new Position(this.line + lineDelta, this.character + characterDelta);
  }

  with(line?: number, character?: number): Position {
    return new Position(line ?? this.line, character ?? this.character);
  }
}

export class Range {
  readonly start: Position;
  readonly end: Position;

  constructor(
    startLineOrPosition: number | Position,
    startCharOrEnd: number | Position,
    endLine?: number,
    endCharacter?: number
  ) {
    if (typeof startLineOrPosition === "number") {
      this.start = new Position(startLineOrPosition, startCharOrEnd as number);
      this.end = new Position(endLine ?? startLineOrPosition, endCharacter ?? (startCharOrEnd as number));
    } else {
      this.start = startLineOrPosition;
      this.end = startCharOrEnd as Position;
    }
  }

  get isEmpty(): boolean {
    return this.start.isEqual(this.end);
  }

  get isSingleLine(): boolean {
    return this.start.line === this.end.line;
  }

  contains(positionOrRange: Position | Range): boolean {
    if (positionOrRange instanceof Range) {
      return this.contains(positionOrRange.start) && this.contains(positionOrRange.end);
    }
    const pos = positionOrRange;
    const afterStart = pos.line > this.start.line || (pos.line === this.start.line && pos.character >= this.start.character);
    const beforeEnd = pos.line < this.end.line || (pos.line === this.end.line && pos.character <= this.end.character);
    return afterStart && beforeEnd;
  }

  isEqual(other: Range): boolean {
    return this.start.isEqual(other.start) && this.end.isEqual(other.end);
  }

  with(start?: Position, end?: Position): Range {
    return new Range(start ?? this.start, end ?? this.end);
  }
}

export class Uri {
  readonly scheme: string;
  readonly fsPath: string;
  private readonly raw?: string;

  constructor(fsPath: string, scheme = "file", raw?: string) {
    this.fsPath = fsPath;
    this.scheme = scheme;
    this.raw = raw;
  }

  get path(): string {
    return this.fsPath;
  }

  toString(): string {
    if (this.raw) {
      return this.raw;
    }
    try {
      return pathToFileURL(this.fsPath).toString();
    } catch {
      return this.fsPath;
    }
  }

  with(change: { scheme?: string; path?: string }): Uri {
    return new Uri(change.path ?? this.fsPath, change.scheme ?? this.scheme);
  }

  static file(path: string): Uri {
    return new Uri(path, "file");
  }

  static parse(value: string): Uri {
    if (value.startsWith("file:")) {
      try {
        return new Uri(fileURLToPath(value), "file", value);
      } catch {
        return new Uri(decodeURIComponent(value.replace(/^file:\/\//, "")), "file", value);
      }
    }
    return new Uri(value, "file", value);
  }
}

export interface TextLine {
  lineNumber: number;
  text: string;
  range: Range;
  rangeIncludingLineBreak: Range;
  firstNonWhitespaceCharacterIndex: number;
  isEmptyOrWhitespace: boolean;
}

export class MarkdownString {
  value: string;
  isTrusted = true;
  supportThemeIcons = true;

  constructor(value = "") {
    this.value = value;
  }

  appendMarkdown(value: string): MarkdownString {
    this.value += value;
    return this;
  }

  appendText(value: string): MarkdownString {
    this.value += value.replace(/([\\`*_[\]{}<>|])/g, "\\$1");
    return this;
  }

  appendCodeblock(value: string, language = ""): MarkdownString {
    this.value += `\n\`\`\`${language}\n${value}\n\`\`\`\n`;
    return this;
  }
}

export class Disposable {
  constructor(private callOnDispose?: () => void) {}
  dispose(): void {
    this.callOnDispose?.();
  }
  static from(...disposables: { dispose(): void }[]): Disposable {
    return new Disposable(() => disposables.forEach((d) => d.dispose()));
  }
}

export const StatusBarAlignment = { Left: 1, Right: 2 } as const;
export const EndOfLine = { LF: 1, CRLF: 2 } as const;
export const ConfigurationTarget = { Global: 1, Workspace: 2, WorkspaceFolder: 3 } as const;
export const ProgressLocation = { SourceControl: 1, Window: 10, Notification: 15 } as const;
export const OverviewRulerLane = { Left: 1, Center: 2, Right: 4, Full: 7 } as const;

export type DecorationInstanceRenderOptions = Record<string, unknown>;
export type ThemableDecorationInstanceRenderOptions = Record<string, unknown>;
export type TextEditorDecorationType = { key: string; dispose(): void };
export type DecorationOptions = {
  range: Range;
  hoverMessage?: MarkdownString | string;
  renderOptions?: DecorationInstanceRenderOptions;
};
export type ConfigurationChangeEvent = {
  affectsConfiguration(section: string): boolean;
};

const configStore: Record<string, unknown> = {};

export function flattenSettings(values: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(values ?? {})) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flattenSettings(value as Record<string, unknown>, full));
    } else {
      out[full] = value;
    }
  }
  return out;
}

export function setWorkspaceConfig(values: Record<string, unknown>): void {
  for (const key of Object.keys(configStore)) {
    delete configStore[key];
  }
  Object.assign(configStore, flattenSettings(values));
}

export function getWorkspaceConfig(): Record<string, unknown> {
  return { ...configStore };
}

let activeDocument: { uri: Uri; fileName: string; getText?: (range?: Range) => string } | undefined;

export function setActiveDocument(doc: typeof activeDocument): void {
  activeDocument = doc;
}

export function getActiveFileName(): string | undefined {
  return activeDocument?.fileName;
}

export function setConfigValue(key: string, value: unknown): void {
  configStore[key] = value;
}

export const editorContext: Record<string, unknown> = {};

type MessageHandler = (message: string) => void;
let notifyError: MessageHandler = (message) => console.error(message);
let notifyInfo: MessageHandler = (message) => console.info(message);

export function setMessageHandlers(handlers: { error: MessageHandler; info: MessageHandler }): void {
  notifyError = handlers.error;
  notifyInfo = handlers.info;
}

class InMemoryDocument {
  readonly uri: Uri;
  readonly languageId: string;
  readonly version = 1;
  private readonly text: string;

  constructor(uri: Uri, text: string, languageId = "plaintext") {
    this.uri = uri;
    this.text = text;
    this.languageId = languageId;
  }

  get fileName(): string {
    return this.uri.fsPath;
  }

  get lineCount(): number {
    return this.text.length === 0 ? 1 : this.text.split(/\r?\n/).length;
  }

  getText(range?: Range): string {
    if (!range) {
      return this.text;
    }
    const lines = this.text.split(/\r?\n/);
    const startLine = lines[range.start.line] ?? "";
    if (range.start.line === range.end.line) {
      return startLine.slice(range.start.character, range.end.character);
    }
    const parts = [startLine.slice(range.start.character)];
    for (let line = range.start.line + 1; line < range.end.line; line++) {
      parts.push(lines[line] ?? "");
    }
    parts.push((lines[range.end.line] ?? "").slice(0, range.end.character));
    return parts.join("\n");
  }

  lineAt(lineOrPosition: number | Position): TextLine {
    const line = typeof lineOrPosition === "number" ? lineOrPosition : lineOrPosition.line;
    const text = (this.text.split(/\r?\n/)[line] ?? "");
    const indent = text.match(/^\s*/)?.[0].length ?? 0;
    return {
      lineNumber: line,
      text,
      range: new Range(line, 0, line, text.length),
      rangeIncludingLineBreak: new Range(line, 0, line + 1, 0),
      firstNonWhitespaceCharacterIndex: indent,
      isEmptyOrWhitespace: indent === text.length,
    };
  }
}

type OutputChannel = {
  name: string;
  append(value: string): void;
  appendLine(value: string): void;
  clear(): void;
  show(): void;
  hide(): void;
  dispose(): void;
  replace(value: string): void;
};

function createOutputChannel(name: string): OutputChannel {
  return {
    name,
    append: (value: string) => process.stderr.write(value),
    appendLine: (value: string) => process.stderr.write(value + "\n"),
    clear: () => {},
    show: () => {},
    hide: () => {},
    dispose: () => {},
    replace: () => {},
  };
}

export const window = {
  get activeTextEditor() {
    if (!activeDocument) {
      return undefined;
    }
    const document = activeDocument;
    return {
      document,
      selection: { active: new Position(0, 0), start: new Position(0, 0), end: new Position(0, 0) },
      setDecorations: () => {},
      edit: async () => true,
    };
  },
  createOutputChannel,
  createStatusBarItem: () => ({
    alignment: StatusBarAlignment.Right,
    priority: 0,
    text: "",
    tooltip: "",
    color: undefined as string | undefined,
    backgroundColor: undefined,
    command: undefined as string | undefined,
    name: "Dependi",
    accessibilityInformation: undefined,
    show: () => {},
    hide: () => {},
    dispose: () => {},
  }),
  createTextEditorDecorationType: () => ({
    key: "dependi",
    dispose: () => {},
  }),
  showErrorMessage: async (message: string, ..._actions: string[]) => {
    notifyError(message);
    return undefined;
  },
  showWarningMessage: async (message: string) => {
    console.warn(message);
    return undefined;
  },
  showInformationMessage: async (message: string) => {
    notifyInfo(message);
    return undefined;
  },
  showTextDocument: async (_document: { uri: Uri; fileName: string; getText?: (range?: Range) => string }) => {
    return window.activeTextEditor;
  },
  withProgress: async <T>(
    _options: unknown,
    task: (progress: { report: (value: unknown) => void }) => Promise<T>
  ): Promise<T> => task({ report: () => {} }),
  setStatusBarMessage: (_text: string, _hideAfterTimeout?: number) => new Disposable(),
  onDidChangeActiveTextEditor: () => new Disposable(),
};

export const workspace = {
  getConfiguration(section?: string) {
    return {
      get<T>(key: string, defaultValue?: T): T | undefined {
        const lookup = section === "dependi" || !section ? key : `${section}.${key}`;
        return (configStore[lookup] as T | undefined) ?? defaultValue;
      },
      has(key: string): boolean {
        const lookup = section === "dependi" || !section ? key : `${section}.${key}`;
        return lookup in configStore;
      },
      update: async (key: string, value: unknown) => {
        const lookup = section === "dependi" || !section ? key : `${section}.${key}`;
        configStore[lookup] = value;
      },
      inspect: () => undefined,
    };
  },
  onDidChangeConfiguration: () => new Disposable(),
  save: async () => true,
  workspaceFolders: [] as { uri: Uri; name: string; index: number }[],
  openTextDocument: async (options: { language?: string; content: string } | Uri) => {
    if (options instanceof Uri) {
      return new InMemoryDocument(options, "", "plaintext");
    }
    if ("content" in options) {
      return new InMemoryDocument(Uri.parse("untitled:dependi"), options.content, options.language);
    }
    return new InMemoryDocument(Uri.parse("untitled:dependi"), "", "plaintext");
  },
  fs: {
    readFile: async () => new Uint8Array(),
    stat: async () => ({ type: 1, ctime: 0, mtime: 0, size: 0 }),
  },
};

export function setWorkspaceFolders(
  folders: { uri: string; name?: string }[] | undefined,
  rootUri?: string | null
): void {
  const list =
    folders && folders.length > 0
      ? folders
      : rootUri
        ? [{ uri: rootUri, name: "" }]
        : [];
  workspace.workspaceFolders = list.map((folder, index) => ({
    uri: Uri.parse(folder.uri),
    name: folder.name || "root",
    index,
  }));
}

export const commands = {
  executeCommand: async (command: string, ...args: unknown[]) => {
    if (command === "setContext" && typeof args[0] === "string") {
      editorContext[args[0]] = args[1];
      return undefined;
    }
    if (command === "vscode.open" && args[0]) {
      notifyInfo(String(args[0]));
      return undefined;
    }
    if (command === "workbench.action.openSettingsJson") {
      notifyInfo("Set lsp.dependi.settings.apiKey in Zed settings.json");
      return undefined;
    }
    return undefined;
  },
  registerCommand: () => new Disposable(),
  registerTextEditorCommand: () => new Disposable(),
};

export const env = {
  isTelemetryEnabled: false,
  language: "en",
  appName: "Zed",
  uriScheme: "zed",
  clipboard: {
    readText: async () => "",
    writeText: async () => {},
  },
};

let gitExtensionFactory: (() => unknown) | undefined;

export function registerGitExtension(factory: () => unknown): void {
  gitExtensionFactory = factory;
}

export const extensions = {
  getExtension: (id?: string) => {
    if (id === "vscode.git" && gitExtensionFactory) {
      return { exports: gitExtensionFactory() };
    }
    return undefined;
  },
  all: [],
};

export function RelativePattern(base: string, pattern: string) {
  return { base, pattern };
}
