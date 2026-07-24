import path from "path";
import { TextEditor } from "vscode";
import { status } from "../../commands/replacers";
import { Configs, Settings } from "../../config";
import { StatusBar } from "../../ui/status-bar";
import { CurrentLanguage, Language } from "../Language";
import { CratesFetcher } from "../fetchers/CratesFetcher";
import { DependiFetcher } from "../fetchers/DependiFetcher";
import { GoProxyFetcher } from "../fetchers/GoProxyFetcher";
import { NpmFetcher } from "../fetchers/NpmFetcher";
import { PackagistFetcher } from "../fetchers/PackagistFetcher";
import { PypiFetcher } from "../fetchers/PypiFetcher";
import { CargoTomlParser } from "../parsers/CargoTomlParser";
import { GoModParser } from "../parsers/GoModParser";
import { NpmParser } from "../parsers/PackageJsonParser";
import { DenoJsonParser } from "../parsers/DenoJsonParser";
import { PhpParser } from "../parsers/ComposerJsonParser";
import { PyProjectParser } from "../parsers/PyProjectParser";
import { PypiParser } from "../parsers/PypiParser";
import { PnpmWorkspaceYamlParser } from "../parsers/PnpmWorkspaceYamlParser";
import { CargoTomlListener } from "./CargoTomlListener";
import { DependiListener } from "./DependiListener";
import { GoModListener } from "./GoModListener";
import { NpmListener } from "./NpmListener";
import { PhpListener } from './PhpListener';
import { PnpmWorkspaceListener } from "./PnpmWorkspaceListener";
import { PypiListener } from "./PypiListener";
import { Listener } from "./listener";
import { PubspecListener } from "./PubspecListener";
import { PubDevFetcher } from "../fetchers/PubDevFetcher";
import { PubspecParser } from "../parsers/PubspecParser";
import { NuGetFetcher } from "../fetchers/NuGetFetcher";
import { CsprojParser } from "../parsers/CsprojParser";
import { CSharpListener } from "./CSharpListener";
import { MixExsListener } from "./MixExsListener";
import { HexFetcher } from "../fetchers/HexFetcher";
import { MixExsParser } from "../parsers/MixExsParser";
import { GradleListener } from "./GradleListener";
import { MavenFetcher } from "../fetchers/MavenFetcher";
import { GradleParser } from "../parsers/GradleParser";

let listenerTimer: NodeJS.Timeout | undefined;
let isListening = false;
let pendingEditor: TextEditor | undefined;

/** Cancel a debounced listener and drop any queued editor (e.g. switched to unsupported file). */
export function cancelPendingListener(): void {
  if (listenerTimer) {
    clearTimeout(listenerTimer);
    listenerTimer = undefined;
  }
  pendingEditor = undefined;
}

export default async function listener(editor: TextEditor | undefined): Promise<void> {
  if (listenerTimer) {
    clearTimeout(listenerTimer);
  }

  return new Promise((resolve) => {
    listenerTimer = setTimeout(async () => {
      await runListener(editor);
      resolve();
    }, 200); // Debounce for 200ms
  });
}

async function runListener(editor: TextEditor | undefined): Promise<void> {
  if (!editor || !editor.document) {
    console.debug("Editor is undefined", editor);
    return Promise.resolve();
  }

  // A fetch is already running — keep only the latest editor and decorate it when free.
  // Previously we dropped these, so switching tabs mid-fetch often skipped decorations.
  if (isListening) {
    pendingEditor = editor;
    console.debug("Listener busy, queueing", editor.document.fileName);
    return Promise.resolve();
  }

  let listener: Listener | undefined = undefined;
  switch (CurrentLanguage) {
    case Language.Rust:
      if (!Settings.rust.enabled)
        return;
      listener = new CargoTomlListener(
        new CratesFetcher(Settings.rust.index, Configs.RUST_INDEX_SERVER_URL),
        new CargoTomlParser());
      break;
    case Language.Golang:
      if (!Settings.go.enabled)
        return;
      listener = new GoModListener(
        new GoProxyFetcher(Settings.go.index, Configs.GO_INDEX_SERVER_URL),
        new GoModParser());
      break;
    case Language.JS:
      if (!Settings.npm.enabled)
        return;
      {
        const fileName = path.basename(editor.document.fileName).toLowerCase();
        const parser =
          fileName === "deno.json" || fileName === "deno.jsonc"
            ? new DenoJsonParser()
            : new NpmParser();
        listener = new NpmListener(
          new NpmFetcher(Settings.npm.index, Configs.NPM_INDEX_SERVER_URL),
          parser);
      }
      break;
    case Language.PnpmWorkspace:
      if (!Settings.npm.enabled)
        return;
      listener = new PnpmWorkspaceListener(
        new NpmFetcher(Settings.npm.index, Configs.NPM_INDEX_SERVER_URL),
        new PnpmWorkspaceYamlParser());
      break;
    case Language.PHP:
      if (!Settings.php.enabled)
        return;
      listener = new PhpListener(
        new PackagistFetcher(Settings.php.index, Configs.PHP_INDEX_SERVER_URL),
        new PhpParser());
      break;
    case Language.Python:
      if (!Settings.python.enabled)
        return;
      const fileName = path.basename(editor.document.fileName);
      const parser = (fileName === "pyproject.toml" || fileName === "pixi.toml" )
        ? new PyProjectParser()
        : new PypiParser();
      listener = new PypiListener(
        new PypiFetcher(Settings.python.index, Configs.PYTHON_INDEX_SERVER_URL),
        parser);
      break;
    case Language.Dart:
      if (!Settings.dart.enabled)
        return;
      listener = new PubspecListener(
        new PubDevFetcher(Settings.dart.index, Configs.DART_INDEX_SERVER_URL),
        new PubspecParser());
      break;
    case Language.CSharp:
      if (!Settings.csharp.enabled)
        return;
      listener = new CSharpListener(
        new NuGetFetcher(Settings.csharp.index, Configs.CSHARP_INDEX_SERVER_URL),
        new CsprojParser());
      break;
    case Language.Elixir:
      if (!Settings.elixir.enabled)
        return;
      listener = new MixExsListener(
        new HexFetcher(Settings.elixir.index, Configs.ELIXIR_INDEX_SERVER_URL),
        new MixExsParser());
      break;
    case Language.Gradle:
      if (!Settings.gradle.enabled)
        return;
      listener = new GradleListener(
        new MavenFetcher(Settings.gradle.index, Configs.GRADLE_INDEX_SERVER_URL),
        new GradleParser());
      break;
  }
  if (listener !== undefined) {
    isListening = true;
    status.inProgress = true;
    StatusBar.fetching("");
    StatusBar.show();

    try {
      if (Settings.api.key !== "" && Settings.api.url !== "") {
        // For Rust, use hybrid approach: API for crates.io, direct for alternate registries
        if (CurrentLanguage === Language.Rust && listener instanceof CargoTomlListener) {
          // Load alternate registries first
          await listener.loadAlternateRegistries(editor);
          // Replace fetcher with API fetcher (directFetcher still has CratesFetcher)
          listener.fetcher = new DependiFetcher(Settings.api.url, Configs.INDEX_SERVER_URL);
        } else {
          // For other languages, use API backend exclusively
          listener = new DependiListener(
            new DependiFetcher(Settings.api.url, Configs.INDEX_SERVER_URL),
            listener.parser);
        }
      }

      await listener.parseAndDecorate(editor);
    } finally {
      isListening = false;
      status.inProgress = false;

      const next = pendingEditor;
      pendingEditor = undefined;
      if (next) {
        void runListener(next);
      }
    }
  }
}
