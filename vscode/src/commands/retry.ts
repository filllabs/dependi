import { commands, TextEditor, TextEditorEdit } from "vscode";
import { Configs } from "../config";
import listener from "../core/listeners/listener";

export const retry = commands.registerTextEditorCommand(
  Configs.RETRY,
  (editor: TextEditor, edit: TextEditorEdit, info) => {
    if (editor) {
      listener(editor);
    }
  },
);
