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
        // Packagist allows tags with or without a leading "v"; normalize so
        // locked versions match the stripped versions from the Packagist index.
        state.lockedValue = String(pkg.version).replace(/^v/i, "");
        setLockValue(state, items);
      }
    }
  }
}
