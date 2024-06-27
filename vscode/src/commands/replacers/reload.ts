import { commands, TextEditor, TextEditorEdit } from "vscode";
import listener from "../../core/listeners/listener";
import { Configs } from "../../config";

export const reload = commands.registerTextEditorCommand(
  Configs.RETRY,
  (editor: TextEditor, edit: TextEditorEdit, info) => {
    if (editor) {
      listener(editor);
    }
  },
);
