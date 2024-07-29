/**
 * Commands related to TOML files.
 */
import { commands, Range, TextEditor, TextEditorEdit, workspace } from "vscode";
import { Configs } from "../../config";
import { Logger } from "../../extension";
import { status } from "./replace";



export const updateAll = commands.registerTextEditorCommand(
  Configs.UPDATE_ALL,
  (editor: TextEditor, edit: TextEditorEdit) => {
    if (
      editor &&
      !status.inProgress &&
      status.replaceItems &&
      status.replaceItems.length > 0
    ) {
      status.inProgress = true;
      console.debug("Replacing All");
      for (let i = status.replaceItems.length - 1; i > -1; i--) {
        const rItem = status.replaceItems[i];
        edit.replace(
          new Range(
            rItem.range.start.line,
            rItem.range.start.character,
            rItem.range.end.line,
            rItem.range.end.character,
          ),
          rItem.value,
        );
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
    }
  },
);

