import { fileURLToPath } from "node:url";
import { Position, Range, Uri, type TextLine } from "./shims/vscode";
import type { TextDocument as LspDocument } from "vscode-languageserver-textdocument";

export class VsCodeDocument {
  constructor(private readonly doc: LspDocument) {}

  get uri(): Uri {
    return Uri.parse(this.doc.uri);
  }

  get fileName(): string {
    try {
      return fileURLToPath(this.doc.uri);
    } catch {
      return this.doc.uri;
    }
  }

  get languageId(): string {
    return this.doc.languageId;
  }

  get version(): number {
    return this.doc.version;
  }

  get lineCount(): number {
    return this.doc.lineCount;
  }

  getText(range?: Range): string {
    if (!range) {
      return this.doc.getText();
    }
    return this.doc.getText({
      start: { line: range.start.line, character: range.start.character },
      end: { line: range.end.line, character: range.end.character },
    });
  }

  lineAt(lineOrPosition: number | Position): TextLine {
    const line = typeof lineOrPosition === "number" ? lineOrPosition : lineOrPosition.line;
    const text = this.doc.getText({
      start: { line, character: 0 },
      end: { line, character: Number.MAX_SAFE_INTEGER },
    }).replace(/\r?\n$/, "");
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

  offsetAt(position: Position): number {
    return this.doc.offsetAt(position);
  }

  positionAt(offset: number): Position {
    const pos = this.doc.positionAt(offset);
    return new Position(pos.line, pos.character);
  }
}
