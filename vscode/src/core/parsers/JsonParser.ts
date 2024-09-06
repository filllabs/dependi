import { commands, TextDocument, TextLine, window } from "vscode";
import Item from "../Item";
import { isQuote, shouldIgnoreLine } from "./utils";
import { Settings } from "../../config";
import { CurrentLanguageConfig } from "../Language";
import path from "path";
import * as fs from "fs";

class State {
  inDependencies: boolean;
  items: Item[];
  bypass: boolean;
  constructor() {
    this.inDependencies = false;
    this.items = [] as Item[];
    this.bypass = false;
  }
}

export class JsonParser {
  protected state: State = new State();

  constructor(
    private keys: string[],
    private enableLockFileParsing: boolean,
    private lockFileName: string,
    private lockParser: any,
  ) {}

  parse(doc: TextDocument): Item[] {
    const pattern =
      CurrentLanguageConfig === "npm"
        ? Settings.npm.ignoreLinePattern
        : Settings.php.ignoreLinePattern;
    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, pattern)) {
        continue;
      }
      if (this.state.bypass) {
        continue;
      }
      if (this.isDependencies(line)) {
        // from now on we are in require block read every line until we find the end of the block as dependencies
        this.state.inDependencies = true;
        continue;
      }
      if (this.state.inDependencies) {
        if (isBlockEnd(line)) {
          this.state.inDependencies = false;
          continue;
        }
        let item = parseDependencyLine(line);
        this.addDependency(item);
      }
    }
    return this.enableLockFileParsing
      ? this.parseLockedFile(this.state.items)
      : this.state.items;
  }

  addDependency(item: Item) {
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }

  isDependencies(line: TextLine) {
    const start = line.firstNonWhitespaceCharacterIndex;
    return this.keys.some((key) => {
      return line.text.substring(start, start + key.length + 3) === `"${key}":`;
    });
  }
  parseLockedFile(item: Item[]): Item[] {
    const filePath = window.activeTextEditor?.document.uri.fsPath;
    const dirName = path.dirname(filePath || "");
    try {
      const files = fs.readdirSync(dirName);
      const lockFile = files.find((file) => file === this.lockFileName);
      if (lockFile) {
        const lockFilePath = path.join(dirName, lockFile);
        const fileContent = fs.readFileSync(lockFilePath, "utf8");
        const LockFileParser = this.lockParser;
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
}

function isBlockEnd(line: TextLine): boolean {
  return line.text[line.firstNonWhitespaceCharacterIndex] === "}";
}

function parseDependencyLine(line: TextLine): Item {
  // parse lines like 	"eslint": "8.31.0",
  let endOfName = line.text.indexOf(":", line.firstNonWhitespaceCharacterIndex);
  let startOfVersion = endOfName + 3;
  let endOfVersion = line.text.indexOf('"', startOfVersion);
  if (endOfVersion === -1) {
    endOfVersion = line.text.length;
  }
  let name = line.text.substring(
    line.firstNonWhitespaceCharacterIndex,
    endOfName,
  );
  let version = line.text.substring(startOfVersion, endOfVersion);

  if (isQuote(name[0]) && isQuote(name[name.length - 1])) {
    name = name.substring(1, name.length - 1);
  }
  if (isQuote(version[0]) && isQuote(version[version.length - 1])) {
    version = version.substring(1, version.length - 1);
    startOfVersion++;
    endOfVersion--;
  }

  const item = new Item();
  item.copyFrom(
    name,
    version,
    startOfVersion,
    endOfVersion,
    line.lineNumber,
    line.range.end.character,
  );
  return item;
}
