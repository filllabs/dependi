import { TextEditor } from "vscode";
import { Settings } from "../../config";
import decorate from "../../ui/decorator";
import Dependency from "../Dependency";
import Item from "../Item";
import { Language } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";
import { Listener, replaceItemList } from "./listener";

export class CargoTomlListener implements Listener {
  parser: Parser;
  fetcher: Fetcher;

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
        fetchedDeps = dependencies.map(
          (i) => ({ item: i, versions: [i.value] } as Dependency)
        );
        const promises: any[] = [];
        const versionFetchPromise: Promise<Dependency[]> = this.fetcher.versions(dependencies);
        promises.push(versionFetchPromise);

        // fetch current vulnerabilities depends on check parameter.
        let fetchVulnPromise;
        if (Settings.vulnerability.enabled) {
          fetchVulnPromise = this.fetcher.vulns(fetchedDeps);
          promises.push(fetchVulnPromise);
        }

        // versions and vulnerabilities of current version.
        const [versionResults, vulnResults] = await Promise.all(promises);

        // merge versionResults  with vulnResults set vulns
        fetchedDeps = versionResults;
        if (vulnResults) {
          fetchedDeps.forEach((dep, i) => {
            dep.vulns = vulnResults[i].vulns;
          });
        }
        replaceItemList(fetchedDeps);

        // parallel fetch vulns for current versions
        decorate(editor, fetchedDeps, Language.Rust);

        // fetch all vulnerabilities since current version to latest version.
        if (Settings.vulnerability.enabled) {
          const vulnData = await this.fetcher.vulns(fetchedDeps);
          fetchedVulns = await vulnData;
          decorate(editor, vulnData, Language.Rust);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
var dependencies: Item[];
var fetchedDeps: Dependency[];
var fetchedVulns: Dependency[];
var fetchedDepsMap: Map<string, Dependency[]>;
export { dependencies, fetchedDeps, fetchedDepsMap, fetchedVulns };
