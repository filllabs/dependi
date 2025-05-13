import { TextDocument, TextLine, window, commands } from "vscode";
import Item from "../Item";
import { isQuote, shouldIgnoreLine } from "./utils";
import { Settings } from "../../config";
import path from "path";
import fs from "fs";
import { PubspecLockParser } from "./PubspecLockParser";

export class PubspecParser {
  parse(doc: TextDocument): Item[] {
    let items: Item[] = [];
    let isInDependencySection = false; // Simple boolean state

    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);

      if (shouldIgnoreLine(line, Settings.dart.ignoreLinePattern, ["#"])) {
        continue;
      }

      const firstCharIndex = line.firstNonWhitespaceCharacterIndex;

      if (firstCharIndex === 0) {
        isInDependencySection = isDependencySection(line);
      } else if (isInDependencySection && firstCharIndex === 2) {
        // Lines indented by 2 spaces within a dependency section are likely dependencies
        const item = parsePair(line);
        if (item) {
          items.push(item);
        }
      }
    }
    return Settings.dart.lockFileEnabled ? parseLockFile(items) : items;
  }
}

function isDependencySection(line: TextLine): boolean {
  const dependencySectionKeys = ["dependencies:", "dev_dependencies:"];
  const trimmedLineText = line.text.trim();
  return dependencySectionKeys.some((key) => trimmedLineText === key);
}

function parsePair(line: TextLine): Item | undefined {
  const item = new Item();
  const lineText = line.text;

  const colonIndex = lineText.indexOf(":");
  if (colonIndex === -1) {
    return undefined;
  }

  item.key = lineText.substring(0, colonIndex).trim();

  const valueString = lineText.substring(colonIndex + 1).trim();
  const commentIndex = valueString.indexOf("#");
  let cleanValueString =
    commentIndex !== -1
      ? valueString.substring(0, commentIndex).trim()
      : valueString;

  item.value = cleanValueString;
  item.start = line.text.indexOf(cleanValueString, colonIndex + 1);
  item.end = item.start + cleanValueString.length;
  if (isQuote(cleanValueString[0]) && isQuote(cleanValueString[cleanValueString.length - 1])) {
    item.value = cleanValueString.substring(1, cleanValueString.length - 1);
    item.start += 1;
    item.end -= 1;
  }

  if (!isValidValue(item.value)) {
    return undefined;
  }

  item.line = line.lineNumber;
  item.endOfLine = line.range.end.character;
  item.createRange();
  item.createDecoRange();

  return item;
}

function isValidValue(value: string): boolean {
  if (!value || value === undefined) {
    return false;
  }

  if (value === "any") {
    return true;
  }

  const constraints = value.split(/\s+/).filter((c) => c.length > 0);

  if (constraints.length === 0) {
    return false;
  }
  const singleConstraintPattern = /^[<>~=^]?=?\s*\d+(\.\d+)*([\-+]?\w+)*$/;

  return constraints.every((constraint) =>
    singleConstraintPattern.test(constraint)
  );
}

function parseLockFile(item: Item[]): Item[] {
  const filePath = window.activeTextEditor?.document.uri.fsPath;
  const dirName = path.dirname(filePath || "");
  try {
    const files = fs.readdirSync(dirName);
    const lockFile = files.find((file) => file.endsWith(".lock"));
    if (lockFile) {
      const lockFilePath = path.join(dirName, lockFile);
      const fileContent = fs.readFileSync(lockFilePath, "utf8");
      const LockFileParser = new PubspecLockParser();
      item = LockFileParser.parse(fileContent, item);
      commands.executeCommand("setContext", "dependi.hasLockFile", true);
    } else {
      commands.executeCommand("setContext", "dependi.hasLockFile", false);
    }
  } catch (err) {
    console.error(err);
  }
  return item;
}
