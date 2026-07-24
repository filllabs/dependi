import { TextDocument, TextLine } from "vscode";
import Item from "../Item";
import { isQuote, shouldIgnoreLine } from "./utils";
import { Settings } from "../../config";

class State {
  inRequire: boolean;
  items: Item[];
  bypass: boolean;
  constructor() {
    this.inRequire = false;
    this.items = [] as Item[];
    this.bypass = false;
  }
}

export class GoModParser {
  parse(doc: TextDocument): Item[] {
    let state = new State();

    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.go.ignoreLinePattern, ["/"])) {
        continue;
      }
      if (state.bypass) {
        continue;
      }
      const requireType = isRequireLine(line);
      if (requireType === "block") {
        // from now on we are in require block read every line until we find the end of the block as dependencies
        state.inRequire = true;
        continue;
      }
      if (state.inRequire) {
        if (isBlockEnd(line)) {
          state.inRequire = false;
          continue;
        }
        let item = parseDependencyLine(line);
        item.createRange();
        item.createDecoRange();
        state.items.push(item);
      }
      if (requireType === "single" && !state.inRequire) {
        let item = parseDependencyLine(line);
        item.createRange();
        item.createDecoRange();
        state.items.push(item);
      }
    }

    return state.items;
  }
}

function isRequireLine(line: TextLine): "block" | "single" | null {
  const start = line.firstNonWhitespaceCharacterIndex;
  const text = line.text.substring(start);
  // require ( ... ) multi-line block
  if (/^require\s*\(/.test(text)) {
    return "block";
  }
  // require module/path v1.2.3
  if (/^require\s+\S+/.test(text)) {
    return "single";
  }
  return null;
}

function isBlockEnd(line: TextLine): boolean {
  return line.text[line.firstNonWhitespaceCharacterIndex] === ")";
}

function parseDependencyLine(line: TextLine): Item {
  // parse lines like:
  //   example.com/othermodule v1.2.3
  //   require example.com/othermodule v1.2.3
  //   require example.com/othermodule v1.2.3 // indirect
  let start = line.firstNonWhitespaceCharacterIndex;
  let text = line.text.substring(start);

  const requirePrefix = text.match(/^require\s+(?!\()/);
  if (requirePrefix) {
    start += requirePrefix[0].length;
    text = line.text.substring(start);
  }

  // Ignore trailing comments when locating tokens
  const commentIdx = text.indexOf("//");
  if (commentIdx !== -1) {
    text = text.substring(0, commentIdx).trimEnd();
  }

  const tokens = text.match(/^(\S+)\s+(\S+)/);
  let name = tokens?.[1] ?? "";
  let version = tokens?.[2] ?? "";

  let startOfVersion = start + (tokens ? text.indexOf(version) : 0);
  let endOfVersion = startOfVersion + version.length;

  if (name && isQuote(name[0]) && isQuote(name[name.length - 1])) {
    name = name.substring(1, name.length - 1);
  }
  if (version && isQuote(version[0]) && isQuote(version[version.length - 1])) {
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
    line.range.end.character
  );
  return item;
}
