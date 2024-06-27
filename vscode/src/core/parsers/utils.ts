import { TextLine } from "vscode";

export function isGitConflictLine(line: string) {
  switch (line[0]) {
    case "<":
      return line.startsWith("<<<<<<<");
    case "=":
      return line.startsWith("=======");
    case ">":
      return line.startsWith(">>>>>>>");
    default:
      return false;
  }
}

export function isQuote(ch: string) {
  return ch === '"' || ch === "'";
}

export function isComment(ch: string, commentChar: string) {
  return ch === commentChar;
}

export function isDisabledLine(line: string) {
  return line.includes("dependi:") && line.includes("disable-check");
}

export function shouldIgnoreLine(
  line: TextLine,
  commandChar?: string
): boolean {
  if (line.isEmptyOrWhitespace) {
    return true;
  }
  let column = line.firstNonWhitespaceCharacterIndex;
  const firstChar = line.text[column];
  if (commandChar) {
    if (isComment(firstChar, commandChar)) {
      return true;
    }
  }
  if (isDisabledLine(line.text)) {
    return true;
  }
  if (isGitConflictLine(line.text)) {
    return true;
  }
  return false;
}
