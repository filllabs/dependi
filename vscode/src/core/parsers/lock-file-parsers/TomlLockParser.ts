import Item from "../../Item";

export class State {
  isTable: boolean;
  lockedValue: string;
  dependency: string;
  constructor() {
    this.isTable = false;
    this.lockedValue = "";
    this.dependency = "";
  }
}

export class TomlLockFileParser {
  constructor() {}

  parse(fileContent: string, items: Item[]): Item[] {
    const doc = fileContent.split("\n");
    const state = new State();
    for (let row = 0; row < doc.length; row++) {
      let line = doc[row];
      if (this.isTableSection(line)) {
        line = doc[++row];
        if (line.startsWith("name")) {
          state.dependency = this.getPackageName(line);
          if (isPackagePresent(items, state.dependency)) {
            line = doc[++row];
            if (line.startsWith("version")) {
              state.lockedValue = this.getParsedVersion(line);
              this.setLockValue(state, items);
              row++;
            }
          }
        }
      }
    }

    return items;
  }

  isTableSection(line: string): boolean {
    return line.startsWith("[[") && line.endsWith("]]");
  }

  setLockValue(state: State, items: Item[]): void {
    let foundItem = items.find((item) => item.key === state.dependency);
    if (foundItem) {
      foundItem.locked = state.lockedValue;
    }
    state.lockedValue = "";
    state.dependency = "";
  }

  getPackageName(line: string): string {
    let packageName = line.split(" = ")[1];
    return clearText(packageName);
  }

  getParsedVersion(line: string): string {
    let packageVersion = line.split("version = ")[1];
    return clearText(packageVersion);
  }
}

export function isPackagePresent(items: Item[], packageName: string): boolean {
  return items.some((item) => item.key === packageName);
}
export function clearText(text: string) {
  return text.replace(/[^a-zA-Z0-9-_.*]/g, "").trim();
}
