import { commands, TextEditor, TextEditorEdit, workspace } from "vscode";
import { Configs } from "../../config";
import listener from "../../core/listeners";
import { CurrentLanguage, Language } from "../../core/Language";
const config = workspace.getConfiguration("dependi");

export const disableLockFileParsing = commands.registerTextEditorCommand(
  Configs.DISABLE_LOCK_FILE_PARSING,
  (editor: TextEditor, edit: TextEditorEdit, info) => {
    if (editor) {
      switch (CurrentLanguage) {
        case Language.Rust:
          config.update(Configs.RUST_ENABLED_LOCK_FILE, false);
          break;
        case Language.JS:
          config.update(Configs.NPM_ENABLED_LOCK_FILE, false);
          break;
        case Language.PHP:
          config.update(Configs.PHP_ENABLED_LOCK_FILE, false);
          break;
        case Language.Python:
          config.update(Configs.PYTHON_ENABLED_LOCK_FILE, false);
          break;
        default:
          break;
      }
      commands.executeCommand("setContext", "dependi.isLock", false);
      setTimeout(() => {
        listener(editor);
      }, 1000);
    }
  }
);
