import { commands, TextDocument, TextLine, window } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";
import { isQuote, shouldIgnoreLine } from "./utils";
import path from "path";
import fs from "fs";
import { TomlLockFileParser } from "./TomlLockParser";

export class State {
  inInlineTable: boolean;
  inArray: boolean;
  isMultipleDepTable: boolean;
  isSingle: boolean;
  items: Item[];
  currentItem: Item;
  bypass: boolean;
  isSubTable: boolean;
  constructor() {
    this.inInlineTable = false;
    this.inArray = false;
    this.isMultipleDepTable = false;
    this.isSingle = false;
    this.items = [] as Item[];
    this.currentItem = new Item();
    this.bypass = false;
    this.isSubTable = false;
  }
}

export class TomlParser implements Parser {
  constructor(
    private pattern: string,
    private enableLockFileParsing: boolean
  ) {}

  parse(doc: TextDocument): Item[] {
    let items: Item[] = [];
    const state = new State();
    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, this.pattern, ["#"])) {
        continue;
      }
      // if it is table  check if it is dependency table and its type, single or multiple
      if (isTable(line)) {
        state.bypass = false;
        // in new table if an single dependency is in process, push it to items and reset the state
        if (state.isSingle) {
          this.addItem(state, items);
        }
        if (isDependencyTable(line.text)) {
          state.isMultipleDepTable = true;
          state.isSingle = false;
          state.isSubTable = false;
        } else if (isDependencySingle(line.text)) {
          // if it is single dependency, create a new item and start parsing we need to get crate name from here
          state.isMultipleDepTable = false;
          state.isSubTable = false;
          state.isSingle = true;
          state.currentItem = new Item();
          let cleanText = line.text;
          if (cleanText.includes("#")) {
            cleanText = cleanText.substring(0, cleanText.indexOf("#")).trim();
          }
          // crate name is the last part of the table name
          state.currentItem.key = cleanText.substring(
            cleanText.lastIndexOf(".") + 1,
            cleanText.indexOf("]")
          );
        } else {
          state.isMultipleDepTable = false;
          state.isSingle = false;
          state.isSubTable = false;
          state.bypass = true;
        }
        continue;
      } else if (this.isSubTable(line.text, state)) {
        state.bypass = false;
        state.isSubTable = true;
        continue;
      }
      // if bypass is true, we need to skip the next line until new table is found
      if (state.bypass) {
        continue;
      }
      if (state.isMultipleDepTable || state.isSubTable) {
        // if it is multiple dependency table, we need to read pairs until we find another table
        const pair = this.parsePair(line.text, row);
        if (!pair) {
          continue;
        }
        // since it is multiple depedency table we need to add the item
        state.currentItem.copyFrom(
          pair.key,
          pair.value,
          pair.start,
          pair.end,
          row,
          line.range.end.character
        );
        this.addItem(state, items);

        continue;
      } else {
        // we neet 2 things, version and package name from next rows until we find another table
        const pair = this.parsePair(line.text, row);
        if (!pair) {
          continue;
        }
        switch (pair.key) {
          case "version":
            state.currentItem.copyFrom(
              undefined,
              pair.value,
              pair.start,
              pair.end,
              row,
              line.range.end.character
            );
            continue;
          case "package":
            state.currentItem.copyFrom(pair.value);
            continue;
          case "features":
          case "default-features":
          case "path":
          case "workspace":
            continue;
          default:
          //TODO: handle inner pair dependencies
        }
      }
    }
    this.addItem(state, items);
    return this.enableLockFileParsing ? parseLockFile(items) : items;
  }

  addItem(state: State, items: Item[]) {
    if (!state.currentItem.isValid()) {
      return;
    }
    state.currentItem.createRange();
    state.currentItem.createDecoRange();
    items.push(state.currentItem);
    state.currentItem = new Item();
  }

  parsePair(line: string, row: number): Item | undefined {
    const item = new Item();
    let eqIndex = line.indexOf("=");
    if (eqIndex === -1) {
      return undefined;
    }
    row = eqIndex + 1;
    const commentIndex = line.indexOf("#");
    item.key = clearText(line.substring(0, eqIndex));
    item.key = item.key.replace(".version", "");
    item.value = line
      .substring(eqIndex + 1, commentIndex > -1 ? commentIndex : line.length)
      .trim()
      .replace(/^"|"$|'/g, "");

    if (
      isBoolean(item.value) ||
      containsIgnoredKeywordsInValue(item.value) ||
      containsIgnoredKeywordsInKey(item.key)
    ) {
      return undefined;
    }
    if (line.indexOf("{") > -1) {
      // json object
      parsePackage(line, item);
      parseVersion(line, item);
      return item.start > -1 ? item : undefined;
    }
    item.start = line.indexOf(item.value, eqIndex);
    item.end = item.start + item.value.length;
    return item.start > -1 ? item : undefined;
  }

  isSubTable(line: string, state: State): boolean {
    return false;
  }
}

export function parseVersion(line: string, item: Item) {
  let i = item.start;
  let eqIndex = line.indexOf("version");
  if (eqIndex === -1) {
    return;
  }
  i = eqIndex + 7;
  while (i < line.length) {
    const ch = line[i];
    if (ch === "=") {
      item.start = i;
      parseVersionValue(line, item);
      return;
    }
    i++;
  }
  return;
}

function isDependencyTable(line: string): boolean {
  return line.includes("dependencies]");
}

function parseVersionValue(line: string, item: Item) {
  let i = item.start;
  let foundAt = -1;
  let foundQuote = 0;
  // find prev quote

  while (i++ < line.length) {
    const ch = line[i];
    if (isQuote(ch)) {
      foundQuote++;
      if (foundQuote === 2) {
        // if we found 2 quotes, we are done since it all rolls back by 1 increase by one before break
        i++;
        break;
      }

      continue;
    }
    if (isWhiteSpace(ch)) {
      if (foundAt > -1) {
        break;
      }
      continue;
    } else if (foundAt > -1) continue;
    foundAt = i;
  }
  i--;
  const found = line.substring(foundAt, i);
  if (isBoolean(found)) {
    return;
  }
  item.value = found;
  item.start = foundAt;
  item.end = item.start + item.value.length;
}

export function parsePackage(line: string, item: Item) {
  let i = item.start;
  let eqIndex = line.indexOf("package");
  if (eqIndex == -1) {
    return;
  }
  i = eqIndex + 7;

  while (i < line.length) {
    const ch = line[i];
    if (ch === "=") {
      parsePackageValue(line, item, i);
      return;
    }
    i++;
  }
}

function parsePackageValue(line: string, item: Item, start: number) {
  let i = start;
  let foundAt = -1;
  while (i++ < line.length) {
    const ch = line[i];
    if (isWhiteSpace(ch) || isQuote(ch)) {
      if (foundAt > -1) {
        break;
      }
      continue;
    } else if (foundAt > -1) continue;
    foundAt = i;
  }
  item.key = line.substring(foundAt, i);
}

function isWhiteSpace(ch: string) {
  return ch === " " || ch === "\t";
}

function isDependencySingle(line: string): boolean {
  return line.includes("dependencies.");
}

export function isBoolean(value: string): boolean {
  return value === "true" || value === "false";
}
export function clearText(text: string) {
  return text.replace(/[^a-zA-Z0-9-_.*]/g, "").trim();
}

function isTable(line: TextLine) {
  let column = line.firstNonWhitespaceCharacterIndex;
  const firstChar = line.text[column];
  return firstChar === "[";
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
      const LockFileParser = new TomlLockFileParser();
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

function containsIgnoredKeywordsInValue(value: string) {
  const ignoredKeywords = ["git", "path"];
  return ignoredKeywords.some((v) => value.includes(v));
}

function containsIgnoredKeywordsInKey(key: string) {
  const ignoredKeywords = ["."];
  return ignoredKeywords.some((k) => key.includes(k));
}
