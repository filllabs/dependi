import { commands, TextEditor, TextEditorEdit, workspace } from "vscode";
import listener from "../../core/listeners";
import { Configs } from "../../config";
import { CurrentLanguage, Language } from "../../core/Language";

const config = workspace.getConfiguration("dependi");

export const enableLockFileParsing = commands.registerTextEditorCommand(
  Configs.ENABLE_LOCK_FILE_PARSING,
  (editor: TextEditor, edit: TextEditorEdit, info) => {
    if (editor) {
      switch (CurrentLanguage) {
        case Language.Rust:
          config.update(Configs.RUST_ENABLED_LOCK_FILE, true);
          break;
        case Language.JS:
          config.update(Configs.NPM_ENABLED_LOCK_FILE, true);
          break;
        case Language.PHP:
          config.update(Configs.PHP_ENABLED_LOCK_FILE, true);
          break;
        case Language.Python:
          config.update(Configs.PYTHON_ENABLED_LOCK_FILE, true);
          break;
        default:
          break;
      }
      commands.executeCommand("setContext", "dependi.isLockFileEnabled", true);
      setTimeout(() => {
        listener(editor);
      }, 1000);
    }
  }
);
