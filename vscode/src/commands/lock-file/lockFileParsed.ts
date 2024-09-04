import path from "path";
import { commands, TextEditor, TextEditorEdit, workspace } from "vscode";
import listener from "../../core/listeners";
import { Configs } from "../../config";

const config = workspace.getConfiguration("dependi");

export const lockFileParsed = commands.registerTextEditorCommand(
  Configs.LOCK_FILE_PARSED,
  (editor: TextEditor, edit: TextEditorEdit, info) => {
    if (editor) {
      const filename = path.basename(editor.document.fileName);

      switch (filename.toLowerCase()) {
        case "cargo.toml":
          config.update(Configs.RUST_ENABLED_LOCK_FILE, false);
          break;
        case "package.json":
          config.update(Configs.NPM_ENABLED_LOCK_FILE, false);
          break;
        case "composer.json":
          config.update(Configs.PHP_ENABLED_LOCK_FILE, false);
          break;
        case "requirements.txt":
          config.update(Configs.PYTHON_ENABLED_LOCK_FILE, false);
          break;
        case "pyproject.toml":
          config.update(Configs.PYTHON_ENABLED_LOCK_FILE, false);
          break;
        default:
          break;
      }

      commands.executeCommand("setContext", "dependi.hasLockFile", false);
      commands.executeCommand("setContext", "dependi.isLock", false);
      setTimeout(() => {
        listener(editor);
      }, 1000);
    }
  }
);
