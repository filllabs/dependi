import { validRange } from "semver";
import { Settings } from "../../../vscode/src/config";
import { isPinnedCargoVersion } from "../../../vscode/src/core/cargoUtils";
import Dependency from "../../../vscode/src/core/Dependency";
import Item from "../../../vscode/src/core/Item";
import { Language } from "../../../vscode/src/core/Language";
import {
  checkVersion,
  convertElixirVersionToSemver,
  convertPythonVersionToSemver,
} from "../../../vscode/src/semver/semverUtils";
import type { Analysis } from "./analyze";

export type HintKind = "COMP" | "PATCH" | "INCOMP" | "ERROR";

export type PreparedDep = {
  dependency: Dependency;
  kind: HintKind;
  label: string;
  hover: string;
};

function vulnsFor(dep: Dependency, version: string): string[] {
  const source = dep.vulns as Map<string, string[]> | Record<string, string[]> | undefined;
  if (!source) {
    return [];
  }
  if (source instanceof Map) {
    return source.get(version) ?? [];
  }
  return source[version] ?? [];
}

function isLocal(version?: string): boolean {
  if (!version) return false;
  return (
    version.startsWith("file:") ||
    version.startsWith("path:") ||
    version.startsWith("link:") ||
    version.startsWith("git:") ||
    version.startsWith("git+") ||
    version.startsWith("github:") ||
    version.startsWith("workspace:") ||
    version.startsWith("ssh:") ||
    version.startsWith("http:") ||
    version.startsWith("https:")
  );
}

function versionToSemverRange(version: string, language: Language): string {
  if (language === Language.Python) {
    return convertPythonVersionToSemver(version);
  }
  if (language === Language.Elixir) {
    return convertElixirVersionToSemver(version);
  }
  return version;
}

function getLinks(lang: Language, key: string, item?: Item): string {
  const cleanKey = key.replace(/"/g, "");
  switch (lang) {
    case Language.Rust:
      return ` _([View crate](https://crates.io/crates/${cleanKey}) | [Check reviews](https://web.crev.dev/rust-reviews/crate/${cleanKey}))_`;
    case Language.Golang:
      return ` _([View module](https://pkg.go.dev/${cleanKey}))_`;
    case Language.JS:
      if (item?.source === "jsr") {
        return ` _([View package](https://jsr.io/${cleanKey}))_`;
      }
      return ` _([View package](https://npmjs.com/package/${cleanKey}))_`;
    case Language.PHP:
      return ` _([View package](https://packagist.org/packages/${cleanKey}))_`;
    case Language.Python:
      return ` _([View package](https://pypi.org/project/${cleanKey}))_`;
    case Language.Dart:
      return ` _([View package](https://pub.dev/packages/${cleanKey}))_`;
    case Language.CSharp:
      return ` _([View package](https://www.nuget.org/packages/${cleanKey}))_`;
    case Language.Elixir:
      return ` _([View package](https://hex.pm/packages/${cleanKey}))_`;
    case Language.Gradle: {
      if (item?.source === "gradle-wrapper" || cleanKey === "gradle") {
        return ` _([View releases](https://gradle.org/releases/))_`;
      }
      const [group, artifact] = cleanKey.split(":");
      if (group && artifact) {
        return ` _([View artifact](https://central.sonatype.com/artifact/${group}/${artifact}))_`;
      }
      return "";
    }
    default:
      return "";
  }
}

function getVersionUrl(lang: Language, key: string, version: string, item?: Item): string {
  switch (lang) {
    case Language.Rust:
      return `https://docs.rs/crate/${key}/${version}`;
    case Language.Golang:
      return `https://pkg.go.dev/${key}@${version}`;
    case Language.JS:
      if (item?.source === "jsr") {
        return `https://jsr.io/${key}/${version}`;
      }
      return `https://npmjs.com/package/${key}/v/${version}`;
    case Language.PHP:
      return `https://packagist.org/packages/${key}#${version}`;
    case Language.Python:
      return `https://pypi.org/project/${key}/${version}`;
    case Language.Dart:
      return `https://pub.dev/packages/${key}/versions/${version}`;
    case Language.CSharp:
      return `https://www.nuget.org/packages/${key}/${version}`;
    case Language.Elixir:
      return `https://hexdocs.pm/${key}/${version}`;
    case Language.Gradle: {
      if (item?.source === "gradle-wrapper" || key === "gradle") {
        return `https://docs.gradle.org/${version}/release-notes.html`;
      }
      const [group, artifact] = key.split(":");
      if (group && artifact) {
        return `https://central.sonatype.com/artifact/${group}/${artifact}/${version}`;
      }
      return "";
    }
    default:
      return "";
  }
}

function getDocsLink(lang: Language, key: string, version: string, item?: Item): string {
  const url = getVersionUrl(lang, key, version, item);
  if (!url) {
    return "";
  }
  const label =
    lang === Language.Gradle && (item?.source === "gradle-wrapper" || key === "gradle")
      ? "release notes"
      : "docs";
  return `[${label}](${url})`;
}

function templateFor(kind: HintKind): string {
  switch (kind) {
    case "PATCH":
      return Settings.decorator.patchUpdate.template || "⚠️ ${version}";
    case "INCOMP":
      return Settings.decorator.incompatible.template || "❌ ${version}";
    case "ERROR":
      return Settings.decorator.error.template || "❗️❗️❗️";
    default:
      return Settings.decorator.compatible.template || "✅";
  }
}

function classify(dep: Dependency, language: Language): HintKind {
  if (dep.error && (!dep.versions || dep.versions.length === 0)) {
    return "ERROR";
  }
  const version = dep.item.value?.replace(",", "") ?? "";
  const versions = dep.versions ?? [];
  const [satisfies, hasPatchUpdate, maxSatisfying] = checkVersion(
    version,
    versions,
    dep.item.lockedAt
  );
  if (!validRange(versionToSemverRange(version, language))) {
    return "ERROR";
  }
  let kind: HintKind = versions[0] !== maxSatisfying ? (satisfies ? "COMP" : "INCOMP") : "COMP";
  if (hasPatchUpdate && kind === "COMP") {
    kind = "PATCH";
  }
  return kind;
}

export function prepareDependencies(analysis: Analysis, _uri: string): PreparedDep[] {
  const prepared: PreparedDep[] = [];
  for (const dependency of analysis.dependencies) {
    if (
      dependency.item.registry &&
      dependency.item.registry !== "crates-io" &&
      (!dependency.versions || dependency.versions.length === 0)
    ) {
      continue;
    }

    const versions = dependency.versions ?? [];
    const version = dependency.item.value?.replace(",", "") ?? "";
    const kind =
      dependency.error && versions.length === 0
        ? "ERROR"
        : classify(dependency, analysis.language);

    let label = "";
    if (!isLocal(version) && kind !== "ERROR") {
      label = templateFor(kind).replace("${version}", versions[0] ?? "");
    } else if (kind === "ERROR") {
      label = templateFor("ERROR");
    }

    const vulnCount = vulnsFor(dependency, dependency.item.lockedAt ?? version).length;
    if (vulnCount > 0 && !isLocal(version)) {
      const vulnText = (Settings.decorator.vulnerability.template || "🚨 ${count}").replace(
        "${count}",
        `${vulnCount}`
      );
      label = label ? `${label}  ${vulnText}` : vulnText;
    }

    prepared.push({
      dependency,
      kind,
      label,
      hover: buildHover(dependency, analysis.language, kind),
    });
  }
  return prepared;
}

function buildHover(dep: Dependency, language: Language, kind: HintKind): string {
  const lines: string[] = [];
  const version = dep.item.value?.replace(",", "") ?? "";

  if (kind === "ERROR" || dep.error) {
    lines.push("#### Errors");
    for (const part of (dep.error ?? "No versions found").split("\n").filter(Boolean)) {
      lines.push(`* ${part.trim()}`);
    }
    return lines.join("\n");
  }

  const currentVulns = vulnsFor(dep, version).length
    ? vulnsFor(dep, version)
    : vulnsFor(dep, dep.item.lockedAt ?? version);
  if (currentVulns?.length) {
    lines.push("#### Vulnerabilities (Current)");
    for (const id of currentVulns) {
      lines.push(`- [${id}](https://osv.dev/vulnerability/${id})`);
    }
    lines.push("");
  }

  lines.push(`#### Versions${getLinks(language, dep.item.key, dep.item)}`);
  const versions = dep.versions ?? [];
  const [, , maxSatisfying] = checkVersion(version, versions, dep.item.lockedAt);
  const shown = versions.slice(0, 40);
  for (const v of shown) {
    const isCurrent = v === maxSatisfying;
    const isLatest = v === versions[0];
    const url = getVersionUrl(language, dep.item.key, v, dep.item);
    const linked = url ? `[${v}](${url})` : v;
    const docs = isCurrent || isLatest ? ` ${getDocsLink(language, dep.item.key, v, dep.item)}` : "";
    const vulns = vulnsFor(dep, v);
    const vulnSuffix = vulns?.length ? `  🚨 ${vulns.length}` : "";
    const text = isCurrent ? `**${linked}**` : linked;
    lines.push(`* ${text}${docs}${vulnSuffix}`);
  }
  if (versions.length > shown.length) {
    lines.push(`* … ${versions.length - shown.length} more`);
  }
  lines.push("");
  lines.push("To change the version, use **code actions** (`cmd-.` / `ctrl-.`) and pick **Use … to**.");
  return lines.join("\n");
}

export function preservePrefix(currentText: string, newVersion: string): string {
  const prefixMatch = currentText.match(/^(\^|~|>=?|<=?|=)?(v|V)?/);
  if (prefixMatch?.[0]) {
    const operator = prefixMatch[1] || "";
    const vPrefix = prefixMatch[2] || "";
    const cleanVersion = newVersion.replace(/^(\^|~|>=?|<=?|=)?(v|V)?/, "");
    return operator + vPrefix + cleanVersion;
  }
  return newVersion;
}

export function canUpdate(dep: Dependency, language: Language): boolean {
  if (!dep.versions?.[0] || isLocal(dep.item.value)) {
    return false;
  }
  if (language === Language.Rust && isPinnedCargoVersion(dep.item.value)) {
    return false;
  }
  return dep.versions[0] !== dep.item.value?.replace(/^(\^|~|>=?|<=?|=)?(v|V)?/, "");
}
