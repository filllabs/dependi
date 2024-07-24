import { Settings } from "../../config";
import Item from "../Item";
import { State, TomlParser } from "./TomlParser";

export class PyProjectParser extends TomlParser {
  constructor() {
    super(Settings.python.ignoreLinePattern);
  }

  addItem(state: State, items: Item[]) {
    if (!state.currentItem.isValid()) {
      return;
    }
    if (state.currentItem.key === "python") {
      return;
    }
    state.currentItem.createRange();
    state.currentItem.createDecoRange();
    items.push(state.currentItem);
    state.currentItem = new Item();
  }
}