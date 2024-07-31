import Dependency from "../Dependency";
import { Language } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";
import { Listener } from "./listener";

export class JsonListener extends Listener {
  lang: Language;
  constructor(fetcher: Fetcher, parser: Parser, lang: Language) {
    super(fetcher, parser);
    this.lang = lang;
  }
  //   async parseAndDecorate(editor: TextEditor) {
  //     try {
  //       dependencies = this.parser.parse(editor.document);

  //       if (!fetchedLatest || !fetchedLatestsMap) {
  //         const latestResult = await this.fetcher.versions(dependencies);
  //         fetchedLatest = latestResult!;
  //         if (Settings.vulnerability.enabled) {
  //           fetchedLatest = await this.fetcher.vulns(fetchedLatest);
  //         }
  //         decorate(editor, fetchedLatest, this.lang);
  //       };

  //       if (!fetchedDeps || !fetchedDepsMap) {
  //         const versionResults = await this.fetcher.versions(dependencies);
  //         fetchedDeps = versionResults!;
  //         if (Settings.vulnerability.enabled) {
  //           const chunkedArrays = chunkDataArray(fetchedDeps, 1000);
  //           const promises = chunkedArrays.map(async (chunk) => {
  //             return this.fetcher.vulns(chunk);
  //           });
  //           // Wait for all promises to resolve
  //           const chunkPromise = await Promise.all(promises);
  //           fetchedDeps = chunkPromise.reduce((acc, curr) => acc.concat(curr), []);
  //         }


  //         replaceItemList(fetchedDeps);
  //         decorate(editor, fetchedDeps, this.lang);
  //       }

  //     } catch (e) {
  //       console.error(e);
  //       Logger.appendLine(`Failed to parse and decorate ${e}`);
  //     }
  //   }

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
