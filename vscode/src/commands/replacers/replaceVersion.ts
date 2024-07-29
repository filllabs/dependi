import { Range, TextEditor, TextEditorEdit, commands, workspace } from "vscode";
import { Configs } from "../../config";
import { Logger } from "../../extension";
import { ReplaceItem, status } from "./replace";

/**
 * Replace the version of the dependency at the given range.
 * @param editor The active text editor.
 * @param edit The text editor edit.
 * @param info The replace item.
 */
export const replaceVersion = commands.registerTextEditorCommand(
  Configs.REPLACE_VERSIONS,
  (editor: TextEditor, edit: TextEditorEdit, info: ReplaceItem) => {
    if (editor && info && !status.inProgress) {

      status.inProgress = true;
      const range = new Range(
        info.range.start.line,
        info.range.start.character,
        info.range.end.line,
        info.range.end.character,
      );
      edit.replace(range, info.value);
      status.inProgress = false;
    }
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