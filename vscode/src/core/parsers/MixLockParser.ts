import Item from "../Item";
import { clearText, isPackagePresent, setLockValue } from "./TomlLockParser";

export class State {
  lockedValue: string;
  dependency: string;
  constructor() {
    this.lockedValue = "";
    this.dependency = "";
  }
}

export class MixLockParser {
  parse(fileContent: string, items: Item[]): Item[] {
    const doc = fileContent.split("\n");
    const state = new State();
    for (let row = 0; row < doc.length; row++) {
      let line = doc[row];
      const packageMatch = line.trim().match(/^"([^"]+)":\s*\{/);
      if (packageMatch) {
        state.dependency = packageMatch[1];
        if (isPackagePresent(items, state.dependency)) {
          for (row++; row < doc.length; row++) {
            line = doc[row];
            if (line.trim().startsWith('"version":')) {
              state.lockedValue = this.getParsedVersion(line);
              setLockValue(state, items);
              row++;
              break;
            }
          }
        }
      }
    }

    return items;
  }

  getParsedVersion(line: string): string {
    const packageVersion = line.split('"version":')[1];
    return clearText(packageVersion);
  }
}
