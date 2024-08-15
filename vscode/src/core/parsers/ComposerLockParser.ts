import Item from "../Item";
import { setLockValue, JsonLockParser, State } from "./JsonLockParser";
import { isPackagePresent } from "./TomlLockParser";

export class ComposerLockParser extends JsonLockParser {
  constructor() {
    super();
  }

  processLockFileDependencies(doc: any, items: Item[], state: State): void {
    const allPackages = [...doc["packages"], ...doc["packages-dev"]];
    for (let i = 0; i < allPackages.length; i++) {
      let pkg = allPackages[i];
      state.dependency = pkg.name;
      if (isPackagePresent(items, state.dependency)) {
        state.lockedValue = pkg.version;
        setLockValue(state, items);
      }
    }
  }
}
