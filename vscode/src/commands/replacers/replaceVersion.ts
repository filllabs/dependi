import { Range, TextEditor, TextEditorEdit, commands, workspace } from "vscode";
import { CommandData, status } from ".";
import { Configs } from "../../config";
import Dependency from "../../core/Dependency";
import { CurrentLanguage } from "../../core/Language";
import { DependencyCache } from "../../core/listeners/listener";
import { Logger } from "../../extension";

/**
 * Replace the version of the dependency at the given range.
 * @param editor The active text editor.
 * @param edit The text editor edit.
 * @param info The replace item.
 */
export const replaceVersion = commands.registerTextEditorCommand(
  Configs.REPLACE_VERSIONS,
  (editor: TextEditor, edit: TextEditorEdit, data: CommandData) => {
    if (editor && data && !status.inProgress) {

      status.inProgress = true;

      const dep = DependencyCache.get(CurrentLanguage)?.get<Dependency>(data.key + data.startLine);

      if (!dep) {
        status.inProgress = false;
        return;
      }
      const range = new Range(
        dep.item.range.start.line,
        dep.item.range.start.character,
        dep.item.range.end.line,
        dep.item.range.end.character,
      );
      
      // Preserve semver prefix and 'v' prefix from original version by reading from the document
      let newVersion = data.version;
      const currentVersionText = editor.document.getText(range);
      const prefixMatch = currentVersionText.match(/^(\^|~|>=?|<=?|=)?(v|V)?/);
      if (prefixMatch && prefixMatch[0]) {
        const operator = prefixMatch[1] || '';
        const vPrefix = prefixMatch[2] || '';
        const cleanVersion = newVersion.replace(/^(\^|~|>=?|<=?|=)?(v|V)?/, '');
        newVersion = operator + vPrefix + cleanVersion;
      }
      
      edit.replace(range, newVersion);
      status.inProgress = false;
    }
    workspace.save(editor.document.uri).then((uri) => {
      if (!uri) {
        console.error("Failed to save", uri);
        Logger.appendLine(`Failed to save ${uri}`);
      }
    });
  },
);