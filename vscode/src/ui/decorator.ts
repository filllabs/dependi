import {
  TextEditor,
  DecorationOptions,
} from "vscode";
import { StatusBar } from "./status-bar";
import Dependency from "../core/Dependency";
import decoration from "./decoration";
import { Language } from "../core/Language";
import DecorationPreferences, { loadPref } from "./pref";

var previousPref: DecorationPreferences | undefined;

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
  // vulns (params)
  const pref = loadPref();

  const errors: Array<string> = [];
  const filtered = dependencies.filter((dep: Dependency) => {
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

    const vuln: Dependency = dependencies[i];
    try {
      let deco = decoration(
        editor,
        dependency.item,
        dependency.versions || [],
        JSON.parse(JSON.stringify(pref)),
        lang,
        dependency.vulns,
        dependency.error
      );

      if (deco) {
        switch (deco[1]) {
          case "COMP":
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
      errors.push(`Failed to build build decorator (${dependency.item.value})`);
    }
  }
  // dispose old decorations
  if (previousPref) {
    previousPref.compatibleType.dispose();
    previousPref.incompatibleType.dispose();
    previousPref.errorType.dispose();
  }

  editor.setDecorations(pref.compatibleType, compOptions);
  editor.setDecorations(pref.incompatibleType, inCompOptions);
  editor.setDecorations(pref.errorType, errOptions);

  previousPref = pref;

  if (errors.length) {
    StatusBar.setText(
      "Error",
      `Completed with errors
${errors.join("\n")}`
    );
  } else {
    StatusBar.setText("Info");
  }
}



