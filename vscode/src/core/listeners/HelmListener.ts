import { TextEditor } from "vscode";
import { Settings } from "../../config";
import decorate from "../../ui/decorator";
import Dependency from "../Dependency";
import { CurrentLanguage, Language } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";
import { Listener } from "./listener";
import { status } from "../../commands/replacers";
import { StatusBar } from "../../ui/status-bar";

/**
 * HelmListener overrides vulnerability fetching (none for Helm) and only resolves versions.
 */
export class HelmListener extends Listener {
  constructor(fetcher: Fetcher, parser: Parser) {
    super(fetcher, parser);
  }

  async parseAndDecorate(editor: TextEditor) {
    try {
      let dependencies: Dependency[] = this.parse(editor);

      // Only fetch versions (no vulnerability queries for Helm)
      await this.fetcher.versions(dependencies);

      status.updateAllData = dependencies.map((d) => ({
        key: d.item.key,
        version: this.buildVersionWithPrefix(d),
        startLine: d.item.range.start.line,
      }));

      decorate(editor, dependencies, CurrentLanguage);
    } catch (e) {
      console.error(e);
      StatusBar.setText("Error", "Helm processing failed");
    } finally {
      status.inProgress = false;
    }
  }
}

// Convenience factory (if needed elsewhere)
export function createHelmListener(
  fetcher: Fetcher,
  parser: Parser
): HelmListener {
  return new HelmListener(fetcher, parser);
}
