import { Settings } from "../../config";
import Item from "../Item";
import { clearText, isBoolean, parsePackage, parseVersion, State, TomlParser } from "./TomlParser";

export class PyProjectParser extends TomlParser {
  constructor() {
    super(Settings.python.ignoreLinePattern);
  }

  addItem(state: State, items: Item[]) {
    if (!state.currentItem.isValid()) {
      return;
    }
    if (state.currentItem.key === "python" || state.currentItem.key === "requires-python" || state.currentItem.key === 'dependencies') {
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
    const braketIndex = line.substring(0, eqIndex).indexOf("[");
    row = eqIndex + 1;
    const commentIndex = line.indexOf("#");
    item.key = clearText(line.substring(0, braketIndex > -1 ? braketIndex : eqIndex));
    item.key = item.key.replace(".version", "");

    const valueItem = line.substring(eqIndex + 1, commentIndex > -1 ? commentIndex : line.length)
    const lastIndexOf = valueItem.indexOf(",");
    item.value = clearText(lastIndexOf > -1 ? valueItem.substring(0, lastIndexOf) : valueItem);

    if (isBoolean(item.value) || item.value.includes("path")) {
      return undefined;
    }
    if (line.indexOf("{") > -1) {
      // json object
      parsePackage(line, item);
      parseVersion(line, item);
      return item.start > -1 ? item : undefined;
    }

    item.start = line.indexOf(item.value);
    item.end = item.start + item.value.length;

    if (line[eqIndex - 1] === "~" || line[eqIndex - 1] === ">") {
      let lastIndexOf = item.value.lastIndexOf(".");
      const lastString = item.value.substring(lastIndexOf + 1);
      if (isNaN(parseInt(lastString[0]))) {
        lastIndexOf = item.value.substring(0, lastIndexOf).lastIndexOf(".");
      }
      if (lastIndexOf > -1) {
        item.value = item.value.substring(0, lastIndexOf) + ".*";
      }
    }

    return item.start > -1 ? item : undefined;
  }
  isDependencyTable(line: string): boolean {
    return line.includes("dependencies]") || line.includes("[project]");
  }
}