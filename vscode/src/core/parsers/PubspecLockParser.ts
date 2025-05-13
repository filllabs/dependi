import { satisfies } from "semver";
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

export class PubspecLockParser {
  constructor() {}

  parse(fileContent: string, items: Item[]): Item[] {
    const doc = fileContent.split("\n");
    const state = new State();
    for (let row = 0; row < doc.length; row++) {
      let line = doc[row];
      if (line.trim().startsWith("name:")) {
        state.dependency = this.getPackageName(line);
        if (isPackagePresent(items, state.dependency)) {
          for (row++; row < doc.length; row++) {
            line = doc[row];
            if (line.trim().startsWith("version:")) {
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

  getPackageName(line: string): string {
    let packageName = line.split("name:")[1];
    return clearText(packageName);
  }

  getParsedVersion(line: string): string {
    let packageVersion = line.split("version:")[1];
    return clearText(packageVersion);
  }
}
