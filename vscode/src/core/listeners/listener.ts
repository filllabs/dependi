/**
 * Listener for TOML files.
 * Filters active editor files according to the extension.
 */
import { TextEditor } from "vscode";
import { ReplaceItem, status } from "../../commands/replacers/replace";
import { Configs, Settings } from "../../config";
import { StatusBar } from "../../ui/status-bar";
import Dependency from "../Dependency";
import { CurrentLanguage, Language } from "../Language";
import { CratesFetcher } from "../fetchers/CratesFetcher";
import { DependiFetcher } from "../fetchers/DependiFetcher";
import { GoProxyFetcher } from "../fetchers/GoProxyFetcher";
import { NpmFetcher } from "../fetchers/NpmFetcher";
import { PhpFetcher } from "../fetchers/PhpFetcher";
import { PypiFetcher } from "../fetchers/PypiFetcher";
import { Fetcher } from "../fetchers/fetcher";
import { CargoTomlParser } from "../parsers/CargoTomlParser";
import { GoModParser } from "../parsers/GoModParser";
import { NpmParser } from "../parsers/NpmParser";
import { PhpParser } from "../parsers/PhpParser";
import { PypiParser } from "../parsers/PypiParser";
import { Parser } from "../parsers/parser";
import { CargoTomlListener } from "./CargoTomlListener";
import { DependiListener } from "./DependiListener";
import { GoModListener } from "./GoModListener";
import { NpmListener } from "./NpmListener";
import { PhpListener } from './PhpListener';
import { PypiListener } from "./PypiListener";
import path from "path";
import { PyProjectParser } from "../parsers/PyProjectParser";

export interface Listener {
  fetcher: Fetcher;
  parser: Parser;
  parseAndDecorate(editor: TextEditor): Promise<void>;
}


export default async function listener(editor: TextEditor | undefined): Promise<void> {
  if (editor) {
    let listener: Listener | undefined = undefined;
    let ignoreUnstablesKey = "";
    switch (CurrentLanguage) {
      case Language.Rust:
        if (!Settings.rust.enabled)
          return;
        ignoreUnstablesKey = Configs.RUST_IGNORE_UNSTABLES;
        listener = new CargoTomlListener(
          new CratesFetcher(Settings.rust.index, ignoreUnstablesKey, Configs.RUST_INDEX_SERVER_URL),
          new CargoTomlParser());
        break;
      case Language.Golang:
        if (!Settings.go.enabled)
          return;
        ignoreUnstablesKey = Configs.GO_IGNORE_UNSTABLES;
        listener = new GoModListener(
          new GoProxyFetcher(Settings.go.index, ignoreUnstablesKey, Configs.GO_INDEX_SERVER_URL),
          new GoModParser());
        break;
      case Language.JS:
        if (!Settings.npm.enabled)
          return;
        ignoreUnstablesKey = Configs.NPM_IGNORE_UNSTABLES;
        listener = new NpmListener(
          new NpmFetcher(Settings.npm.index, ignoreUnstablesKey, Configs.NPM_INDEX_SERVER_URL),
          new NpmParser());
        break;
      case Language.PHP:
        if (!Settings.php.enabled)
          return;
        ignoreUnstablesKey = Configs.PHP_IGNORE_UNSTABLES;
        listener = new PhpListener(
          new PhpFetcher(Settings.php.index, ignoreUnstablesKey, Configs.PHP_INDEX_SERVER_URL),
          new PhpParser());
        break;
      case Language.Python:
        if (!Settings.python.enabled)
          return;
        ignoreUnstablesKey = Configs.PYTHON_IGNORE_UNSTABLES;
        const parser = path.basename(editor.document.fileName) === "pyproject.toml" ? new PyProjectParser() : new PypiParser();
        listener = new PypiListener(
          new PypiFetcher(Settings.python.index, ignoreUnstablesKey, Configs.PYTHON_INDEX_SERVER_URL), 
          parser);
    }
    if (listener !== undefined) {

      if (Settings.api.key !== "" && Settings.api.url !== "") {
        listener = new DependiListener(
          new DependiFetcher(Settings.api.url, ignoreUnstablesKey, Configs.INDEX_SERVER_URL),
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
  return Promise.resolve();
}

export function replaceItemList(deps: Dependency[]): void {
  // filter out items without versions or value equals version index 0
  status.replaceItems = deps
    .filter(i => i.versions && i.versions.length > 1 && i.versions[0] !== i.item.value)
    .map(
      i => ({ range: i.item.range, value: i.versions?.[0] } as ReplaceItem)
    );
}
