import { TextEditor } from "vscode";
import { Settings } from "../../config";
import { Logger } from "../../extension";
import decorate from "../../ui/decorator";
import Dependency from "../Dependency";
import Item from "../Item";
import { Language } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";
import { Listener, replaceItemList } from "./listener";

export class PypiListener implements Listener {
  fetcher: Fetcher;
  parser: Parser;
  constructor(fetcher: Fetcher, parser: Parser) {
    this.fetcher = fetcher;
    this.parser = parser;
  }
  async parseAndDecorate(editor: TextEditor) {
    try {
      dependencies = this.parser.parse(editor.document);
      if (!fetchedDeps || !fetchedDepsMap) {

        // parallel fetch versions
        // create initial fetchedDeps from dependencies
        fetchedDeps = dependencies.map((i) => ({ item: i, versions: [i.value] }) as Dependency);
        const versionFetchPromise = this.fetcher.versions(dependencies);

        let fetchVulnPromise;
        if (Settings.vulnerability.enabled) {
          fetchVulnPromise = this.fetcher.vulns(fetchedDeps);
        }

        const [versionResults, vulnResults] = await Promise.all([versionFetchPromise, fetchVulnPromise]);

        // merge versionResults  with vulnResults set vulns
        fetchedDeps = versionResults;
        if (vulnResults) {
          fetchedDeps.forEach((dep, i) => {
            dep.vulns = vulnResults[i].vulns;
          });
        }

        replaceItemList(fetchedDeps);
        // parallel fetch vulns for current versions
        decorate(editor, fetchedDeps, Language.Python);

        if (Settings.vulnerability.enabled) {
          const vulnData = await this.fetcher.vulns(fetchedDeps);
          fetchedVulns = await vulnData;
          decorate(editor, fetchedVulns, Language.Python);
        }
      }
    } catch (e) {
      console.error(e);
      Logger.appendLine(`Failed to parse and decorate ${e}`);
    }
  }

}

var dependencies: Item[];
var fetchedDeps: Dependency[];
var fetchedVulns: Dependency[];
var fetchedDepsMap: Map<string, Dependency[]>;
export { dependencies, fetchedDeps, fetchedDepsMap };
