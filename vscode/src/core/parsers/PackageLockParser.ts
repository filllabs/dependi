import Item from "../Item";
import { setLockValue, JsonLockParser, State } from "./JsonLockParser";
import { isPackagePresent } from "./TomlLockParser";

export class PackageLockParser extends JsonLockParser {
  constructor() {
    super();
  }

  processLockFileDependencies(doc: any, items: Item[], state: State): void {
    for (let pkg in doc["packages"]) {
      if (pkg.startsWith("node_modules/")) {
        state.dependency = pkg.replace("node_modules/", "");
        if (isPackagePresent(items, state.dependency)) {
          state.lockedValue = doc["packages"][pkg].version;
          setLockValue(state, items);
        }
      }
    }
  }
}
