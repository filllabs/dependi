import { TextEditor } from "vscode";
import { Settings } from "../../config";
import decorate from "../../ui/decorator";
import Dependency from "../Dependency";
import Item from "../Item";
import { Language } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";
import { Listener, replaceItemList } from "./listener";

export class JsonListener implements Listener {
  constructor(
		public fetcher: Fetcher,
		public parser: Parser,
		public lang: Language
	) {
  }
  async parseAndDecorate(editor: TextEditor, filterDeps?: (deps: Item[]) => Item[]){
    try {
      dependencies = this.parser.parse(editor.document);
      dependencies = filterDeps ? filterDeps(dependencies) : dependencies;

      if (!fetchedLatest || !fetchedLatestsMap) {
        const latestResult = await this.fetcher.versions(dependencies);
        fetchedLatest = latestResult!;
        if (Settings.vulnerability.enabled) {
          fetchedLatest = await this.fetcher.vulns(fetchedLatest);
        }
        decorate(editor, fetchedLatest, this.lang);
      };

      if (!fetchedDeps || !fetchedDepsMap) {
        const versionResults = await this.fetcher.versions(dependencies);
        fetchedDeps = versionResults!;
        if (Settings.vulnerability.enabled) {
          const chunkedArrays = chunkDataArray(fetchedDeps, 1000);
          const promises = chunkedArrays.map(async (chunk) => {
            return this.fetcher.vulns(chunk);
          });
          // Wait for all promises to resolve
          const chunkPromise = await Promise.all(promises);
          fetchedDeps = chunkPromise.reduce((acc, curr) => acc.concat(curr), []);
        }


        replaceItemList(fetchedDeps);
        decorate(editor, fetchedDeps, this.lang);
      }

    } catch (e) {
      console.error(e);
    }
  }

}

function chunkDataArray(data: Dependency[], chunkSize: number) {
  const chunkedData = [];
  let currentChunk: Dependency[] = [];
  let currentChunkSize = 0;
  data.forEach(obj => {
    const objSize = obj.versions?.length ?? 0;
    if (currentChunkSize + objSize <= chunkSize) {
      currentChunk.push(obj);
      currentChunkSize += objSize;
    } else {
      chunkedData.push(currentChunk);
      if (obj.versions && obj.versions.length > chunkSize) {
        obj.versions = obj.versions.slice(0, 1000);
      }
      currentChunk = [obj];
      currentChunkSize = objSize;
    }
  });
  if (currentChunk.length > 0) {
    chunkedData.push(currentChunk);
  }
  return chunkedData;
}

var dependencies: Item[];
var fetchedDeps: Dependency[];
var fetchedDepsMap: Map<string, Dependency[]>;
var fetchedLatest: Dependency[];
var fetchedLatestsMap: Map<string, Dependency[]>;
export { dependencies, fetchedDeps, fetchedDepsMap, fetchedLatest, fetchedLatestsMap };
