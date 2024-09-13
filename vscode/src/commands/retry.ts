import { commands, TextEditor, TextEditorEdit } from "vscode";
import { Configs } from "../config";
import listener from "../core/listeners";
import { DependencyCache } from "../core/listeners/listener";
import { CurrentLanguage } from "../core/Language";

export const retry = commands.registerTextEditorCommand(
  Configs.RETRY,
  (editor: TextEditor, edit: TextEditorEdit, info) => {
    if (editor) {
      DependencyCache.delete(CurrentLanguage);
      listener(editor);
    }
  },
);
