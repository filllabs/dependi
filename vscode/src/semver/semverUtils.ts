import { maxSatisfying, satisfies, valid, gt } from "semver";


export function checkVersion(version: string = "0.0.0", versions: string[]): [boolean, string | null] {
  let v = version;
  let prefix = v.charCodeAt(0);
  if (prefix > 47 && prefix < 58)
    v = "^" + v;
  const max = versions[0];
  if (maxSatisfying(versions, v) === null) {
    if (valid(v) === null) {
      return [false, null];
    }
    if (gt(v, max)) {
      return [true, v]
    }
  }
  return [satisfies(max, v), maxSatisfying(versions, v)];
}