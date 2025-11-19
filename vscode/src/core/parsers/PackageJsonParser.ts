import { Settings } from "../../config";
import Item from "../Item";
import { JsonParser } from "./JsonParser";
import { PackageLockJsonParser } from "./PackageLockJsonParser";

export class NpmParser extends JsonParser {
  constructor() {
    super(
      [
        "catalog",
        "catalogs",
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "optionalDependencies",
      ],
      Settings.npm.lockFileEnabled,
      "package-lock.json",
      new PackageLockJsonParser()
    );
  }

  

  addDependency(item: Item) {
    const skipPrefixes = ["link:", "catalog:", "workspace:"];
    if (skipPrefixes.some(prefix => item.value?.startsWith(prefix))) {
      return;
    }
    item = convertAliasToPackageName(item);
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
}

function convertAliasToPackageName(item: Item): Item {
  if (item.value?.startsWith("npm:")) {
    const atSymbolIndex = item.value.indexOf("@");
    if (atSymbolIndex !== -1) {
      item.key = item.value.slice(4, atSymbolIndex);
      item.value = item.value.slice(atSymbolIndex + 1);
      item.start = item.start + item.key.length + 5;
    }
  }
  return item;
}
