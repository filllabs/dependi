/**
 * Commands related to TOML files.
 */
import { commands, Range, TextEditor, TextEditorEdit, workspace } from "vscode";
import { status } from ".";
import { Configs } from "../../config";
import Dependency from "../../core/Dependency";
import { CurrentLanguage } from "../../core/Language";
import { DependencyCache } from "../../core/listeners/listener";
import { Logger } from "../../extension";



export const updateAll = commands.registerTextEditorCommand(
  Configs.UPDATE_ALL,
  (editor: TextEditor, edit: TextEditorEdit) => {
    if (!editor || status.inProgress) {
      console.debug("Editor is undefined or in progress", editor, status.inProgress);
      return;
    }
    status.inProgress = true;
    console.debug("Replacing All");
    for (let i = status.updateAllData.length - 1; i > -1; i--) {
      const rItem = status.updateAllData[i];
      if (rItem.version === "") {
        console.debug("Version is empty", rItem);
        Logger.appendLine(`Version is empty ${rItem}`);
        continue;
      }
      const dep = DependencyCache.get(CurrentLanguage)?.get<Dependency>(rItem.key + rItem.startLine);
      if (!dep) {
        console.error("Dependency not found", rItem.key);
        Logger.appendLine(`Dependency not found ${rItem.key}`);
        continue;
      }
      
      const range = new Range(
        dep.item.range.start.line,
        dep.item.range.start.character,
        dep.item.range.end.line,
        dep.item.range.end.character,
      );
      
      // Preserve semver prefix and 'v' prefix from original version
      let newVersion = rItem.version;
      const currentVersionText = editor.document.getText(range);
      const prefixMatch = currentVersionText.match(/^(\^|~|>=?|<=?|=)?(v|V)?/);
      if (prefixMatch && prefixMatch[0]) {
        const operator = prefixMatch[1] || '';
        const vPrefix = prefixMatch[2] || '';
        const cleanVersion = newVersion.replace(/^(\^|~|>=?|<=?|=)?(v|V)?/, '');
        newVersion = operator + vPrefix + cleanVersion;
      }
      
      edit.replace(range, newVersion);
    }
    status.inProgress = false;

    workspace.save(editor.document.uri).then((uri) => {
      if (uri)
        console.debug("Saved", uri);
      else {
        console.error("Failed to save", uri);
        Logger.appendLine(`Failed to save ${uri}`);
      }
    });
  },
);

