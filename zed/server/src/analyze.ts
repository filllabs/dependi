import path from "node:path";
import { Configs, Settings } from "../../../vscode/src/config";
import Dependency from "../../../vscode/src/core/Dependency";
import { CurrentLanguage, Language, setLanguage } from "../../../vscode/src/core/Language";
import { CratesFetcher } from "../../../vscode/src/core/fetchers/CratesFetcher";
import { DependiFetcher } from "../../../vscode/src/core/fetchers/DependiFetcher";
import { GoProxyFetcher } from "../../../vscode/src/core/fetchers/GoProxyFetcher";
import { HexFetcher } from "../../../vscode/src/core/fetchers/HexFetcher";
import { JsrFetcher } from "../../../vscode/src/core/fetchers/JsrFetcher";
import { MavenFetcher } from "../../../vscode/src/core/fetchers/MavenFetcher";
import { NpmFetcher } from "../../../vscode/src/core/fetchers/NpmFetcher";
import { NuGetFetcher } from "../../../vscode/src/core/fetchers/NuGetFetcher";
import { PackagistFetcher } from "../../../vscode/src/core/fetchers/PackagistFetcher";
import { PubDevFetcher } from "../../../vscode/src/core/fetchers/PubDevFetcher";
import { PypiFetcher } from "../../../vscode/src/core/fetchers/PypiFetcher";
import { TerraformFetcher } from "../../../vscode/src/core/fetchers/TerraformFetcher";
import { CargoTomlListener } from "../../../vscode/src/core/listeners/CargoTomlListener";
import { CSharpListener } from "../../../vscode/src/core/listeners/CSharpListener";
import { GoModListener } from "../../../vscode/src/core/listeners/GoModListener";
import { GradleListener } from "../../../vscode/src/core/listeners/GradleListener";
import { MixExsListener } from "../../../vscode/src/core/listeners/MixExsListener";
import { NpmListener } from "../../../vscode/src/core/listeners/NpmListener";
import { PhpListener } from "../../../vscode/src/core/listeners/PhpListener";
import { PnpmWorkspaceListener } from "../../../vscode/src/core/listeners/PnpmWorkspaceListener";
import { PubspecListener } from "../../../vscode/src/core/listeners/PubspecListener";
import { PypiListener } from "../../../vscode/src/core/listeners/PypiListener";
import { TerraformListener } from "../../../vscode/src/core/listeners/TerraformListener";
import { Listener } from "../../../vscode/src/core/listeners/listener";
import { CargoTomlParser } from "../../../vscode/src/core/parsers/CargoTomlParser";
import { CsprojParser } from "../../../vscode/src/core/parsers/CsprojParser";
import { DenoJsonParser } from "../../../vscode/src/core/parsers/DenoJsonParser";
import { GoModParser } from "../../../vscode/src/core/parsers/GoModParser";
import { GradleParser } from "../../../vscode/src/core/parsers/GradleParser";
import { MixExsParser } from "../../../vscode/src/core/parsers/MixExsParser";
import { NpmParser } from "../../../vscode/src/core/parsers/PackageJsonParser";
import { PhpParser } from "../../../vscode/src/core/parsers/ComposerJsonParser";
import { PnpmWorkspaceYamlParser } from "../../../vscode/src/core/parsers/PnpmWorkspaceYamlParser";
import { PubspecParser } from "../../../vscode/src/core/parsers/PubspecParser";
import { PyProjectParser } from "../../../vscode/src/core/parsers/PyProjectParser";
import { PypiParser } from "../../../vscode/src/core/parsers/PypiParser";
import { TerraformParser } from "../../../vscode/src/core/parsers/TerraformParser";
import { VsCodeDocument } from "./document";
import { setActiveDocument } from "./shims/vscode";

const MANIFEST_NAMES = new Set([
  "cargo.toml",
  "go.mod",
  "package.json",
  "deno.json",
  "deno.jsonc",
  "pnpm-workspace.yaml",
  "composer.json",
  "pyproject.toml",
  "pixi.toml",
  "pubspec.yaml",
  "mix.exs",
  "build.gradle",
  "build.gradle.kts",
  "libs.versions.toml",
  "gradle-wrapper.properties",
  "directory.build.props",
  "directory.packages.props",
]);

export function isManifestFile(filePath: string): boolean {
  const filename = path.basename(filePath).toLowerCase();
  if (MANIFEST_NAMES.has(filename)) {
    return true;
  }
  const ext = path.extname(filename);
  if (ext === ".tf" || ext === ".csproj" || ext === ".fsproj") {
    return true;
  }
  return (ext === ".txt" || ext === ".in") && filename.startsWith("requirement");
}

function listenerFor(filePath: string): Listener | undefined {
  setLanguage(filePath);
  switch (CurrentLanguage) {
    case Language.Rust:
      if (!Settings.rust.enabled) return undefined;
      return new CargoTomlListener(
        new CratesFetcher(Settings.rust.index, Configs.RUST_INDEX_SERVER_URL),
        new CargoTomlParser()
      );
    case Language.Golang:
      if (!Settings.go.enabled) return undefined;
      return new GoModListener(
        new GoProxyFetcher(Settings.go.index, Configs.GO_INDEX_SERVER_URL),
        new GoModParser()
      );
    case Language.JS: {
      if (!Settings.npm.enabled) return undefined;
      const fileName = path.basename(filePath).toLowerCase();
      const parser =
        fileName === "deno.json" || fileName === "deno.jsonc"
          ? new DenoJsonParser()
          : new NpmParser();
      return new NpmListener(
        new NpmFetcher(Settings.npm.index, Configs.NPM_INDEX_SERVER_URL),
        parser
      );
    }
    case Language.PnpmWorkspace:
      if (!Settings.npm.enabled) return undefined;
      return new PnpmWorkspaceListener(
        new NpmFetcher(Settings.npm.index, Configs.NPM_INDEX_SERVER_URL),
        new PnpmWorkspaceYamlParser()
      );
    case Language.PHP:
      if (!Settings.php.enabled) return undefined;
      return new PhpListener(
        new PackagistFetcher(Settings.php.index, Configs.PHP_INDEX_SERVER_URL),
        new PhpParser()
      );
    case Language.Python: {
      if (!Settings.python.enabled) return undefined;
      const fileName = path.basename(filePath);
      const parser =
        fileName === "pyproject.toml" || fileName === "pixi.toml"
          ? new PyProjectParser()
          : new PypiParser();
      return new PypiListener(
        new PypiFetcher(Settings.python.index, Configs.PYTHON_INDEX_SERVER_URL),
        parser
      );
    }
    case Language.Dart:
      if (!Settings.dart.enabled) return undefined;
      return new PubspecListener(
        new PubDevFetcher(Settings.dart.index, Configs.DART_INDEX_SERVER_URL),
        new PubspecParser()
      );
    case Language.CSharp:
      if (!Settings.csharp.enabled) return undefined;
      return new CSharpListener(
        new NuGetFetcher(Settings.csharp.index, Configs.CSHARP_INDEX_SERVER_URL),
        new CsprojParser()
      );
    case Language.Elixir:
      if (!Settings.elixir.enabled) return undefined;
      return new MixExsListener(
        new HexFetcher(Settings.elixir.index, Configs.ELIXIR_INDEX_SERVER_URL),
        new MixExsParser()
      );
    case Language.Gradle:
      if (!Settings.gradle.enabled) return undefined;
      return new GradleListener(
        new MavenFetcher(Settings.gradle.index, Configs.GRADLE_INDEX_SERVER_URL),
        new GradleParser()
      );
    case Language.Terraform:
      if (!Settings.terraform.enabled) return undefined;
      return new TerraformListener(
        new TerraformFetcher(Settings.terraform.index, Configs.TERRAFORM_INDEX_SERVER_URL),
        new TerraformParser()
      );
    default:
      return undefined;
  }
}

function buildVersionWithPrefix(dependency: Dependency): string {
  const latestVersion = dependency.versions?.[0] ?? "";
  const currentValue = dependency.item.value || "";
  if (currentValue === "*") {
    return "*";
  }
  const prefixMatch = currentValue.match(/^(\^|~|>=|<=|>|<|=)?(.+)$/);
  const prefix = prefixMatch ? prefixMatch[1] : "";
  if (!prefix) {
    return latestVersion;
  }
  return prefix + latestVersion;
}

export type Analysis = {
  language: Language;
  dependencies: Dependency[];
  updateAll: { key: string; version: string; startLine: number }[];
};

function shouldFetchOsv(fetcher: Listener["fetcher"]): boolean {
  return Settings.vulnerability.enabled && !(fetcher instanceof DependiFetcher);
}

export async function analyzeDocument(document: VsCodeDocument): Promise<Analysis | undefined> {
  if (!isManifestFile(document.fileName)) {
    return undefined;
  }

  setActiveDocument(document);
  let listener = listenerFor(document.fileName);
  if (!listener) {
    return undefined;
  }

  const editor = { document } as any;
  if (listener instanceof CargoTomlListener) {
    await listener.loadAlternateRegistries(editor);
  }

  if (Settings.api.key !== "" && Settings.api.url !== "") {
    listener.fetcher = new DependiFetcher(Settings.api.url, Configs.INDEX_SERVER_URL);
    console.info(
      `Dependi index ${Settings.api.url} VulnerabilityCheck=${Settings.vulnerability.enabled}`
    );
  }

  let parsed = listener.parse(editor);
  if (CurrentLanguage === Language.JS && !Settings.npm.jsrEnabled) {
    parsed = parsed.filter((d) => d.item.source !== "jsr");
  }
  const dependencies = await fetchVersions(listener, parsed);
  const updateAll = dependencies.map((d) => ({
    key: d.item.key,
    version: buildVersionWithPrefix(d),
    startLine: d.item.range.start.line,
  }));

  return {
    language: CurrentLanguage,
    dependencies,
    updateAll,
  };
}

async function fetchVersions(listener: Listener, dependencies: Dependency[]): Promise<Dependency[]> {
  if (listener instanceof CargoTomlListener) {
    return fetchRust(listener, dependencies);
  }

  if (listener instanceof NpmListener && Settings.npm.jsrEnabled) {
    const jsrDependencies = dependencies.filter((d) => d.item.source === "jsr");
    const npmDependencies = dependencies.filter((d) => d.item.source !== "jsr");
    const promises: Promise<Dependency[]>[] = [];
    if (npmDependencies.length > 0) {
      promises.push(listener.fetcher.versions(npmDependencies));
      if (shouldFetchOsv(listener.fetcher)) {
        promises.push(
          listener.fetcher.vulns(npmDependencies).catch((error) => {
            console.error("Dependi vulnerability fetch failed:", error);
            return npmDependencies;
          })
        );
      }
    }
    if (jsrDependencies.length > 0) {
      const jsrFetcher = new JsrFetcher(Settings.npm.jsrIndex, "dependi.npm.jsrIndexServerURL");
      promises.push(jsrFetcher.versions(jsrDependencies));
    }
    await Promise.all(promises);
    return npmDependencies.concat(jsrDependencies);
  }

  const promises: Promise<unknown>[] = [listener.fetcher.versions(dependencies)];
  if (shouldFetchOsv(listener.fetcher)) {
    promises.push(
      listener.fetcher.vulns(dependencies).catch((error) => {
        console.error("Dependi vulnerability fetch failed:", error);
        return dependencies;
      })
    );
  }
  await Promise.all(promises);
  return dependencies;
}

async function fetchRust(listener: CargoTomlListener, allDependencies: Dependency[]): Promise<Dependency[]> {
  const cratesIoDependencies = allDependencies.filter(
    (d) => !d.item.registry || d.item.registry === "crates-io"
  );
  const alternateDependencies = allDependencies.filter(
    (d) => d.item.registry && d.item.registry !== "crates-io"
  );
  const promises: Promise<Dependency[]>[] = [];
  const isCratesFetcher = listener.fetcher instanceof CratesFetcher;

  if (cratesIoDependencies.length > 0) {
    if (isCratesFetcher) {
      promises.push(
        (listener.fetcher as CratesFetcher).fetchVersionsWithRegistries(
          cratesIoDependencies,
          listener.alternateRegistries
        )
      );
      if (shouldFetchOsv(listener.fetcher)) {
        promises.push(
          listener.fetcher.vulns(cratesIoDependencies).catch((error) => {
            console.error("Dependi vulnerability fetch failed:", error);
            return cratesIoDependencies;
          })
        );
      }
    } else {
      promises.push(listener.fetcher.versions(cratesIoDependencies));
    }
  }

  if (alternateDependencies.length > 0) {
    const cratesFetcher = isCratesFetcher
      ? (listener.fetcher as CratesFetcher)
      : new CratesFetcher(Settings.rust.index, "");
    promises.push(
      cratesFetcher.fetchVersionsWithRegistries(
        alternateDependencies,
        listener.alternateRegistries
      )
    );
    if (Settings.vulnerability.enabled) {
      promises.push(
        cratesFetcher.vulns(alternateDependencies).catch((error) => {
          console.error("Dependi vulnerability fetch failed:", error);
          return alternateDependencies;
        })
      );
    }
  }

  await Promise.all(promises);
  return cratesIoDependencies.concat(alternateDependencies);
}
