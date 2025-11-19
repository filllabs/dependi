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
    if (item.value?.startsWith("jsr:") || item.value?.startsWith("npm:@jsr/")) {
      item.source = "jsr";
    }
    item = convertAliasToPackageName(item);
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
}

function convertAliasToPackageName(item: Item): Item {
  const value = item.value;
  if (!value) {
    return item;
  }

  // Case 1: "npm:@jsr/scope__name@^1.0.0"
  if (value.startsWith("npm:@jsr/")) {
    const aliasContent = value.substring(4); // from "@jsr/..."
    const lastAt = aliasContent.lastIndexOf("@");

    if (lastAt > 0) {
      let pkgName = aliasContent.substring(0, lastAt); // "@jsr/scope__name"
      const pkgVersion = aliasContent.substring(lastAt + 1); // "^1.0.0"

      // Convert @jsr/scope__name to @scope/name
      pkgName = "@" + pkgName.substring(5).replace(/__/g, "/");

      item.key = pkgName; // The key from package.json might be an alias, so we overwrite it.
      item.value = pkgVersion;
      item.start = item.start + value.lastIndexOf(pkgVersion);
      item.end = item.start + pkgVersion.length;
    }
  }
  // Case 2: "npm:some-pkg@^1.0.0"
  else if (value.startsWith("npm:")) {
    const aliasContent = value.substring(4);
    const lastAt = aliasContent.lastIndexOf('@');
    if (lastAt > 0) {
      item.key = aliasContent.substring(0, lastAt);
      item.value = aliasContent.substring(lastAt + 1);
      item.start = item.start + value.lastIndexOf(item.value);
      item.end = item.start + item.value.length;
    }
  }
  // Case 3: "jsr:@scope/name@^1.0.0"
  else if (value.startsWith("jsr:@")) {
    const aliasContent = value.substring(4); // from "@scope/..."
    const lastAt = aliasContent.lastIndexOf("@");

    if (lastAt > 0) { // lastAt will be at the version separator
      item.key = aliasContent.substring(0, lastAt);
      item.value = aliasContent.substring(lastAt + 1);
      item.start = item.start + value.lastIndexOf(item.value);
      item.end = item.start + item.value.length;
    }
  }
  // Case 4: "jsr:^1.0.0"
  else if (value.startsWith("jsr:")) {
    item.value = value.substring(4); // just the version part
    item.start = item.start + 4; // adjust start to be after "jsr:"
  }

  return item;
}

