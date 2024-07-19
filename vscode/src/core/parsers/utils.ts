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



export function isDisabledLine(line: string) {
  return line.includes("dependi:") && line.includes("disable-check");
}

export function shouldIgnoreLine(
  line: TextLine,
  pattern: string,
  commandChar?: string[]
): boolean {
  if (line.isEmptyOrWhitespace) {
    return true;
  }
  let column = line.firstNonWhitespaceCharacterIndex;
  const firstChar = line.text[column];
  // check if the line is a comment or unwanted line
  if (commandChar && commandChar.includes(firstChar)) {
    return true;
  }
  if (isDisabledLine(line.text)) {
    return true;
  }
  if (isGitConflictLine(line.text)) {
    return true;
  }
  if (isDisablePatternLine(line.text,pattern)) {
    return true;
  }
  return false;
}

export function isDisablePatternLine(line: string, pattern: string) {
  line = line.trim();
  if (pattern.startsWith("*") && pattern.endsWith("*")) {
    const trimmedPattern = pattern.slice(1, -1);
    return line.includes(trimmedPattern);
  } else if (pattern.startsWith("*")) {
    const trimmedPattern = pattern.slice(1);
    return line.endsWith(trimmedPattern);
  } else if (pattern.endsWith("*")) {
    const trimmedPattern = pattern.slice(0, -1);
    return line.startsWith(trimmedPattern);
  }
  return false;
}
