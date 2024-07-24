import { compare, gt, maxSatisfying, minVersion, satisfies, valid } from "semver";
import { Settings } from "../config";
import { CurrentLanguage, Language } from "../core/Language";


export function checkVersion(version: string = "0.0.0", versions: string[]): [boolean, boolean, string | null] {
  let v = version;
  let prefix = v.charCodeAt(0);
  if (prefix > 47 && prefix < 58)
    v = "^" + v;
  const max = versions[0];
  if (maxSatisfying(versions, v) === null) {
    if (valid(v) === null) {
      return [false, false, null];
    }
    // TODO: ask this test with kaan
    const minV = minVersion(v)?.toString() ?? '0.0.0';
    if (gt(minV, max)) {
      return [true, true, v];
    }
  }
  // if check patch is true, check if the patch version is the same or higher than the current version
  let shouldPatchBeChecked = false;
  switch (CurrentLanguage) {
    case Language.Rust:
      shouldPatchBeChecked = Settings.rust.informPatchUpdates;
      break;
    case Language.JS:
      shouldPatchBeChecked = Settings.npm.informPatchUpdates;
      break;
    case Language.PHP:
      shouldPatchBeChecked = Settings.php.informPatchUpdates;
      break;
    case Language.Golang:
      shouldPatchBeChecked = Settings.go.informPatchUpdates;
      break;
    case Language.Python:
      shouldPatchBeChecked = Settings.python.informPatchUpdates;
      break;
  }
  const pathUpdated = shouldPatchBeChecked ? compare(max, minVersion(v) ?? '0.0.0') === 1 : false;
  return [satisfies(max, v), pathUpdated, maxSatisfying(versions, v)];
}