import { TextDocument, TextLine } from "vscode";
import Item from "../Item";
import { isQuote, shouldIgnoreLine } from "./utils";

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
      if (shouldIgnoreLine(line, ["/"])) {
        continue;
      }
      if (state.bypass) {
        continue;
      }
      if (isRequire(line)) {
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
    }

    return state.items;
  }
}

function isRequire(line: TextLine) {
  const start = line.firstNonWhitespaceCharacterIndex;
  return line.text.substring(start, start + 9) === "require (";
}

function isBlockEnd(line: TextLine): boolean {
  return line.text[line.firstNonWhitespaceCharacterIndex] === ")";
}

function parseDependencyLine(line: TextLine): Item {
  // parse lines like 	example.com/othermodule v1.2.3
  let endOfName = line.text.indexOf(" ", line.firstNonWhitespaceCharacterIndex);
  let startOfVersion = endOfName + 1;
  let endOfVersion = line.text.indexOf(" ", startOfVersion);
  if (endOfVersion === -1) {
    endOfVersion = line.text.length;
  }
  let name = line.text.substring(
    line.firstNonWhitespaceCharacterIndex,
    endOfName
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
    line.range.end.character
  );
  return item;
}
