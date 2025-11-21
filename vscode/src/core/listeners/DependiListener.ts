import { TextEditor } from "vscode";
import { Settings } from "../../config";
import { Logger } from "../../extension";
import decorate from "../../ui/decorator";
import Dependency from "../Dependency";
import { CurrentLanguage } from "../Language";
import { Listener } from "./listener";
import { status } from "../../commands/replacers";

export class DependiListener extends Listener {

  async parseAndDecorate(editor: TextEditor) {
    try {
      let dependencies = this.parse(editor);
      if (!Settings.npm.jsrEnabled) {
        dependencies = dependencies.filter((d) => d.item.source !== "jsr");
      }
      // parallel fetch versions
      // create initial fetchedDeps from dependencies
      const versions: Dependency[] = await this.fetcher.versions(dependencies);
      // this.fillCache(CurrentLanguage, versions);

       // clear replaceAllData set new data
       status.updateAllData = dependencies.map((d) => ({
        key: d.item.key,
        version: this.buildVersionWithPrefix(d),
        startLine: d.item.range.start.line,
      }));
      decorate(editor, versions, CurrentLanguage);

    } catch (e) {
      console.error(e);
      Logger.appendLine(`Failed to parse and decorate ${e}`);
    }
  }
}
