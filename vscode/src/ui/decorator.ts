import { DecorationOptions, TextEditor } from "vscode";
import Dependency from "../core/Dependency";
import { Language } from "../core/Language";
import { Logger } from "../extension";
import decoration from "./decoration";
import { getPref } from "./pref";
import { StatusBar } from "./status-bar";

/**
 *
 * @param editor Takes crate info and editor. Decorates the editor.
 * @param dependencies
 */
export default function decorate(
  editor: TextEditor,
  dependencies: Array<Dependency>,
  lang: Language
) {
  console.debug("Decorating", editor.document.fileName);
  // vulns (params)
  const pref = getPref();

  const errors: Array<string> = [];
  const filtered = dependencies.filter((dep: Dependency) => {
    // Skip if the registry is not the main one, and we didn't find any versions.
    // This avoids showing "No versions found" error for custom registries we couldn't reach.
    if (dep.item.registry && dep.item.registry !== "crates-io" && (!dep.versions || dep.versions.length === 0)) {
      return false;
    }
    
    if (dep && !dep.error && dep.versions && dep.versions.length) {
      return dep;
    } else if (!dep.error) {
      dep.error = dep.item.key + ": " + "No versions found";
    }
    errors.push(`${dep.error}`);
    return dep;
  });
  const compOptions: DecorationOptions[] = [];
  const inCompOptions: DecorationOptions[] = [];
  const errOptions: DecorationOptions[] = [];

  for (let i = filtered.length - 1; i > -1; i--) {
    const dependency: Dependency = filtered[i];

    try {
      let deco = decoration(
        editor,
        dependency.item,
        dependency.versions || [],
        pref,
        lang,
        dependency.vulns,
        dependency.error
      );

      if (deco) {
        switch (deco[1]) {
          case "COMP":
            compOptions.push(deco[0]);
            break;
          case "PATCH":
            compOptions.push(deco[0]);
            break;
          case "INCOMP":
            inCompOptions.push(deco[0]);
            break;
          case "ERROR":
            errOptions.push(deco[0]);
            break;
        }
      }
    } catch (e) {
      console.error(e);
      Logger.appendLine(`Failed to build decorator (${dependency.item.value})`);
      errors.push(`Failed to build decorator (${dependency.item.value})`);
    }
  }

  editor.setDecorations(pref.compatibleType, compOptions);
  editor.setDecorations(pref.incompatibleType, inCompOptions);
  editor.setDecorations(pref.errorType, errOptions);

  if (errors.length) {
    StatusBar.setText(
      "Error",
      `Completed with errors ${errors.join("\n")}`,
      true
    );
  } else {
    StatusBar.setText("Info");
  }
}
