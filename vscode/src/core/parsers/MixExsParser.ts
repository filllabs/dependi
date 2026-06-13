import { TextDocument, TextLine, window, commands } from "vscode";
import Item from "../Item";
import { shouldIgnoreLine } from "./utils";
import { Settings } from "../../config";
import path from "path";
import fs from "fs";
import { MixLockParser } from "./MixLockParser";

const NON_HEX_KEYWORDS = ["path:", "git:", "github:", "in_umbrella:"];
const DEPENDENCY_PATTERN = /\{:(\w+),\s*(['"])([^'"]+)\2/;

export class MixExsParser {
  parse(doc: TextDocument): Item[] {
    let items: Item[] = [];

    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);

      if (shouldIgnoreLine(line, Settings.elixir.ignoreLinePattern, ["#"])) {
        continue;
      }

      const item = parseDependency(line);
      if (item) {
        items.push(item);
      }
    }

    return Settings.elixir.lockFileEnabled ? parseLockFile(items) : items;
  }
}

function parseDependency(line: TextLine): Item | undefined {
  const lineText = line.text;
  if (NON_HEX_KEYWORDS.some((keyword) => lineText.includes(keyword))) {
    return undefined;
  }

  const match = lineText.match(DEPENDENCY_PATTERN);
  if (!match) {
    return undefined;
  }

  const version = match[3].trim();
  if (!isValidVersion(version)) {
    return undefined;
  }

  const fullMatch = match[0];
  const matchStart = lineText.indexOf(fullMatch);
  const versionOffset = fullMatch.indexOf(version);

  const item = new Item();
  item.key = match[1];
  item.value = version;
  item.start = matchStart + versionOffset;
  item.end = item.start + version.length;
  item.line = line.lineNumber;
  item.endOfLine = line.range.end.character;
  item.createRange();
  item.createDecoRange();

  return item;
}

function isValidVersion(value: string): boolean {
  if (!value) {
    return false;
  }

  const singleConstraintPattern = /^(~>\s*|~(?=\d)|>=\s*|>\s*|==?\s*)?\d+(\.\d+)*([\-+]?\w+)*$/;
  const constraints = value.split(/\s+or\s+/i).map((constraint) => constraint.trim());
  return constraints.length > 0 && constraints.every((constraint) => singleConstraintPattern.test(constraint));
}

function parseLockFile(item: Item[]): Item[] {
  const filePath = window.activeTextEditor?.document.uri.fsPath;
  const dirName = path.dirname(filePath || "");
  try {
    const lockFilePath = path.join(dirName, "mix.lock");
    if (fs.existsSync(lockFilePath)) {
      const fileContent = fs.readFileSync(lockFilePath, "utf8");
      const lockFileParser = new MixLockParser();
      item = lockFileParser.parse(fileContent, item);
      commands.executeCommand("setContext", "dependi.hasLockFile", true);
    } else {
      commands.executeCommand("setContext", "dependi.hasLockFile", false);
    }
  } catch (err) {
    console.error(err);
  }
  return item;
}
