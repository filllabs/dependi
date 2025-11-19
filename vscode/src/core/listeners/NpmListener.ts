import { TextEditor } from "vscode";
import { status } from "../../commands/replacers";
import { Settings } from "../../config";
import decorate from "../../ui/decorator";
import { StatusBar } from "../../ui/status-bar";
import Dependency from "../Dependency";
import { CurrentLanguage, Language } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { JsrFetcher } from "../fetchers/JsrFetcher";
import { Parser } from "../parsers/parser";
import { JsonListener } from "./JsonListener";

export class NpmListener extends JsonListener {
  constructor(
    public fetcher: Fetcher,
    public parser: Parser,
  ) {
    super(fetcher, parser, Language.JS);
  }

  async parseAndDecorate(editor: TextEditor) {
    try {
      let allDependencies = this.parse(editor);

      let jsrDependencies: Dependency[] = [];
      let npmDependencies: Dependency[] = [];

      if (Settings.npm.jsrEnabled) {
        jsrDependencies = allDependencies.filter((d) => d.item.source === "jsr");
        npmDependencies = allDependencies.filter((d) => d.item.source !== "jsr");
      } else {
        npmDependencies = allDependencies.filter((d) => d.item.source !== "jsr");
      }

      const promises: Promise<Dependency[]>[] = [];

      // Fetch NPM dependencies
      if (npmDependencies.length > 0) {
        promises.push(this.fetcher.versions(npmDependencies));
        if (Settings.vulnerability.enabled) {
          promises.push(this.fetcher.vulns(npmDependencies));
        }
      }

      // Fetch JSR dependencies (only if enabled)
      if (Settings.npm.jsrEnabled && jsrDependencies.length > 0) {
        const jsrFetcher = new JsrFetcher(Settings.npm.jsrIndex, "dependi.npm.jsrIndexServerURL"); // Config key can be a placeholder if not directly used by fetcher
        promises.push(jsrFetcher.versions(jsrDependencies));
        // Vulnerability scanning for JSR is not implemented in this pass.
      }

      await Promise.all(promises);

      const dependencies = npmDependencies.concat(jsrDependencies);

      status.updateAllData = dependencies.map((d) => ({
        key: d.item.key,
        version: this.buildVersionWithPrefix(d),
        startLine: d.item.range.start.line,
      }));

      decorate(editor, dependencies, CurrentLanguage);

      if (Settings.vulnerability.enabled) {
        this.fetcher.vulns(dependencies).then(() => {
          decorate(editor, dependencies, CurrentLanguage);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
