import { compare, gt, maxSatisfying, minVersion, satisfies } from "semver";
import { Settings } from "../config";
import { CurrentLanguage, Language } from "../core/Language";


export function checkVersion(version: string = "0.0.0", versions: string[], lockedAt?: string): [boolean, boolean, string | null] {
  let v = versionToSemver(version);

  const semverVersions = versions.map(versionToSemver);
  const versionMap = mapVersions(versions, semverVersions);

  v = ensureCaretPrefix(v);

  const max = semverVersions[0];

  if (lockedAt) {
    const result = checkLockedVersion(lockedAt, v, semverVersions);
    if (result) return result;
  }

  if (max) {
    const minV = minVersion(v)?.toString() ?? '0.0.0';
    if (gt(minV, max)) {
      return [true, false, version];
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
  const maxSatisfyingVersion = maxSatisfying(semverVersions, v);
  if (maxSatisfyingVersion && CurrentLanguage === Language.Python) {
    return [satisfies(max, v), pathUpdated, versionMap[maxSatisfyingVersion]];
  }

  return [satisfies(max, v), pathUpdated, maxSatisfyingVersion];
}

function mapVersions(versions: string[], semverVersions: string[]): Record<string, string> {
  if (CurrentLanguage !== Language.Python) return {};
  return versions.reduce((acc, version, index) => {
    acc[semverVersions[index]] = version;
    return acc;
  }, {} as Record<string, string>);
}

function ensureCaretPrefix(version: string): string {
  const prefix = version.charCodeAt(0);
  return (prefix > 47 && prefix < 58) ? `^${version}` : version;
}

function checkLockedVersion(lockedAt: string, version: string, semverVersions: string[]): [boolean, boolean, string | null] | null {
  const semverLockedAt = versionToSemver(lockedAt);
  if (!satisfies(semverLockedAt, version, { includePrerelease: true })) {
    return [false, false, lockedAt];
  }
  return [semverLockedAt === semverVersions[0], false, lockedAt];
}

function versionToSemver(version: string): string {
  return CurrentLanguage === Language.Python ? convertPythonVersionToSemver(version) : normalizeVersion(version);
}

function normalizeVersion(version: string): string {
  // count the number of dots in the version string
  let dotCount = 0;
  for (let i = 0; i < version.length; i++) {
    if (version[i] === '.') {
      dotCount++;
      if (dotCount > 1) {
        return version;
      }
    }
  }
  if (!version.includes(".")) {
    return `${version}.0.0`;
  } else if (version.split(".").length === 2) {
    return `${version}.0`;
  }
  return version;
}

function convertPythonVersion(version: string): string {
  return version
      .replace(/\.dev(\d+)/, '-dev.$1')
      .replace(/\.post(\d+)/, '-post.$1')
      .replace(/\.a(\d+)/, '-alpha.$1')
      .replace(/\.b(\d+)/, '-beta.$1')
      .replace(/\.rc(\d+)/, '-rc.$1')
      .replace(/a(\d+)/, '-alpha.$1')
      .replace(/b(\d+)/, '-beta.$1')
      .replace(/rc(\d+)/, '-rc.$1')
      .replace(/c(\d+)/, '-c.$1')
}

export function convertPythonVersionToSemver(version: string): string {
  const v = convertPythonVersion(version);
  const pattern = /^(\d+)\.(\d+)(?:\.(\d+))?([-a-zA-Z0-9.]+)?$/;
  const match = v.match(pattern);

  if (match) {
    const major = match[1]; 
    const minor = match[2];
    const patch = match[3] || 0;
    const preRelease = match[4]? `-${match[4].slice(1)}`  :"";

    const normalizedVersion = `${major}.${minor}.${patch}${preRelease}`;
    return normalizedVersion;
  } else {
    return v;
  }
}