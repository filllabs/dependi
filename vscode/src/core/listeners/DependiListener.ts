import { TextEditor } from "vscode";
import { Logger } from "../../extension";
import decorate from "../../ui/decorator";
import Dependency from "../Dependency";
import { CurrentLanguage } from "../Language";
import { Listener } from "./listener";

export class DependiListener extends Listener {

  async parseAndDecorate(editor: TextEditor) {
    try {
      let dependencies = this.parse(editor);
      // parallel fetch versions
      // create initial fetchedDeps from dependencies
      const versions: Dependency[] = await this.fetcher.versions(dependencies);
      // this.fillCache(CurrentLanguage, versions);
      decorate(editor, versions, CurrentLanguage);

    } catch (e) {
      console.error(e);
      Logger.appendLine(`Failed to parse and decorate ${e}`);
    }
  }
}
