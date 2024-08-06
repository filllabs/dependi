import { CurrentLanguage, Language } from "../core/Language";

var semver =
  /^(?:\^|~)?v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;

type CompareOperator = ">" | ">=" | "=" | "<" | "<=";

function indexOrEnd(str: string, q: string) {
  return str.indexOf(q) === -1 ? str.length : str.indexOf(q);
}

function lastIndexOrEnd(str: string, q: string) {
  return str.lastIndexOf(q) === -1 ? str.length : str.lastIndexOf(q);
}

function split(v: string) {
  const c = v.replace(/^v/, "").replace(/\+.*$/, "");

  const patchIndex =
    CurrentLanguage === Language.Python
      ? lastIndexOrEnd(c, ".")
      : indexOrEnd(c, "-");
  const arr = c.substring(0, patchIndex).split(".");
  arr.push(c.substring(patchIndex + 1));
  return arr;
}

function validate(version: string) {
  if (!semver.test(version)) {
    throw new Error(
      "Invalid argument not valid semver ('" + version + "' received)"
    );
  }
}

function compareVersions(v1: string, v2: string) {
  if (CurrentLanguage !== Language.Python) {
    [v1, v2].forEach(validate);
  }

  const s1 = split(v1);
  const s2 = split(v2);
  const limit = Math.max(s1.length - 1, s2.length - 1);
  for (let i = 0; i < limit; i++) {
    var n1 = parseInt(s1[i] || "0", 10);
    var n2 = parseInt(s2[i] || "0", 10);

    if (n1 > n2) return 1;
    if (n2 > n1) return -1;
  }
  if (s1.length !== s2.length) {
    if (s1.length > s2.length) return 1;
    return -1;
  }

  var sp1 = s1[s1.length - 1];
  var sp2 = s2[s2.length - 1];
  if (sp1 && sp2) {
    const p1 = sp1
      .split(".")
      .map((str) => (/^\d+$/.test(str) ? parseInt(str, 10) : str));
    const p2 = sp2
      .split(".")
      .map((str) => (/^\d+$/.test(str) ? parseInt(str, 10) : str));
    const maxLimit = Math.max(p1.length, p2.length);
    for (let i = 0; i < maxLimit; i++) {
      if (p1[i] === undefined) return -1;
      if (p2[i] === undefined) return 1;

      if (typeof p1[i] === "string" && typeof p2[i] === "number") {
        if (parseInt(p1[i].toString()) >= parseInt(p2[i].toString())) {
          return 1;
        }
        return -1;
      } else if (typeof p2[i] === "string" && typeof p1[i] === "number") {
        if (parseInt(p2[i].toString()) >= parseInt(p1[i].toString())) {
          return -1;
        }
        return 1;
      }

      if (p1[i] > p2[i]) return 1;
      if (p2[i] > p1[i]) return -1;
    }
  } else if (sp1 || sp2) {
    return sp1 ? -1 : 1;
  }

  return 0;
}

var allowedOperators = [">", ">=", "=", "<", "<="];

var operatorResMap = {
  ">": [1],
  ">=": [0, 1],
  "=": [0],
  "<=": [-1, 0],
  "<": [-1],
};

function validateOperator(op: CompareOperator) {
  if (typeof op !== "string") {
    throw new TypeError(
      "Invalid operator type, expected string but got " + typeof op
    );
  }
  if (allowedOperators.indexOf(op) === -1) {
    throw new TypeError(
      "Invalid operator, expected one of " + allowedOperators.join("|")
    );
  }
}

compareVersions.validate = function (version: string) {
  return typeof version === "string" && semver.test(version);
};

compareVersions.compare = function (
  v1: string,
  v2: string,
  operator: CompareOperator
) {
  // Validate operator
  validateOperator(operator);

  // since result of compareVersions can only be -1 or 0 or 1
  // a simple map can be used to replace switch
  var res = compareVersions(v1, v2);

  return operatorResMap[operator].indexOf(res) > -1;
};

export default compareVersions;
