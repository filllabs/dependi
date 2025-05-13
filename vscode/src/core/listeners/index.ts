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
import { PhpParser } from "../parsers/ComposerJsonParser";
import { PyProjectParser } from "../parsers/PyProjectParser";
import { PypiParser } from "../parsers/PypiParser";
import { CargoTomlListener } from "./CargoTomlListener";
import { DependiListener } from "./DependiListener";
import { GoModListener } from "./GoModListener";
import { NpmListener } from "./NpmListener";
import { PhpListener } from './PhpListener';
import { PypiListener } from "./PypiListener";
import { Listener } from "./listener";
import { PubspecListener } from "./PubspecListener";
import { PubDevFetcher } from "../fetchers/PubDevFetcher";
import { PubspecParser } from "../parsers/PubspecParser";


export default async function listener(editor: TextEditor | undefined): Promise<void> {
  if (!editor || !editor.document || editor.document.isDirty) {
    console.debug("Editor is undefined or document is dirty", editor, editor?.document.isDirty);
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
      listener = new NpmListener(
        new NpmFetcher(Settings.npm.index, Configs.NPM_INDEX_SERVER_URL),
        new NpmParser());
      break;
    case Language.PHP:
      if (!Settings.php.enabled)
        return;
      listener = new PhpListener(
        new PackagistFetcher(Settings.php.index, Configs.PHP_INDEX_SERVER_URL),
        new PhpParser());
      break;
    case Language.Python:
      console.log("Python");
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
  }
  if (listener !== undefined) {
    if (Settings.api.key !== "" && Settings.api.url !== "") {
      listener = new DependiListener(
        new DependiFetcher(Settings.api.url, Configs.INDEX_SERVER_URL),
        listener.parser);
    }
    if (!status.inProgress) {
      status.inProgress = true;
      StatusBar.fetching("");
      StatusBar.show();

      return listener?.parseAndDecorate(editor).finally(() => {
        status.inProgress = false;
      });
    }
  }

}
