import { TextEditor } from "vscode";
import decorate from "../../ui/decorator";
import Dependency from "../Dependency";
import Item from "../Item";
import { CurrentLanguage } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";
import { Listener, replaceItemList } from "./listener";

export class DependiListener implements Listener {
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


        const versionResults: Dependency[] = await this.fetcher.versions(dependencies);
        fetchedDeps = versionResults;

        replaceItemList(fetchedDeps);
        decorate(editor, fetchedDeps, CurrentLanguage);
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
