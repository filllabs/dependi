import Item from "../Item";

export class State {
  lockedValue: string;
  dependency: string;
  constructor() {
    this.lockedValue = "";
    this.dependency = "";
  }
}

export class JsonLockParser {
  constructor() {}

  parse(fileContent: string, items: Item[]): Item[] {
    const doc = JSON.parse(fileContent);
    const state = new State();
    this.processLockFileDependencies(doc, items, state);
    return items;
  }
  processLockFileDependencies(doc: any, items: Item[], state: State): void {}
}

export function setLockValue(state: State, items: Item[]): void {
  let foundItem = items.find((item) => item.key === state.dependency);
  if (foundItem) {
    foundItem.lockedAt = state.lockedValue;
  }
  state.lockedValue = "";
  state.dependency = "";
}
