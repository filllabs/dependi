import {
  DecorationInstanceRenderOptions,
  TextEditorDecorationType,
  ThemableDecorationInstanceRenderOptions,
  window,
} from "vscode";
import { Settings } from "../config";

export type DecorationPosition = keyof ThemableDecorationInstanceRenderOptions;

/**
 * DecorationText is a data structure that binds the decoration text to its configured css
 */
export default interface DecorationPreferences {
  compatibleType: TextEditorDecorationType;
  patchUpdateType: TextEditorDecorationType;
  incompatibleType: TextEditorDecorationType;
  errorType: TextEditorDecorationType;
  compatibleText: string;
  patchUpdateText: string;
  incompatibleText: string;
  errorText: string;
  vulnText: string;
  position: DecorationPosition;
}

let cachedPref: DecorationPreferences | undefined;

export function getPref(): DecorationPreferences {
  if (!cachedPref) {
    cachedPref = loadPref();
  }
  return cachedPref;
}

export function reloadPref(): void {
  if (cachedPref) {
    cachedPref.compatibleType.dispose();
    cachedPref.patchUpdateType.dispose();
    cachedPref.incompatibleType.dispose();
    cachedPref.errorType.dispose();
    cachedPref = undefined;
  }
  getPref();
}

function loadPref(): DecorationPreferences {
  const compText = Settings.decorator.compatible.template;
  const compCss = { ...Settings.decorator.compatible.css };
  const patchText = Settings.decorator.patchUpdate.template;
  const patchCss = { ...Settings.decorator.patchUpdate.css };
  const incompText = Settings.decorator.incompatible.template;
  const incompCss = { ...Settings.decorator.incompatible.css };
  const errorText = Settings.decorator.error.template;
  const errorCss = { ...Settings.decorator.error.css };
  const vulnText = Settings.decorator.vulnerability.template;

  const position = Settings.decorator.position;
  initializeCSS(compCss, position, compText);
  initializeCSS(incompCss, position, incompText);
  initializeCSS(errorCss, position, errorText);

  return {
    compatibleType: createType(compCss),
    patchUpdateType: createType(patchCss),
    incompatibleType: createType(incompCss),
    errorType: createType(errorCss),
    compatibleText: compText,
    patchUpdateText: patchText,
    incompatibleText: incompText,
    errorText,
    vulnText: vulnText,
    position,
  };
}
function initializeCSS(
  css: DecorationInstanceRenderOptions,
  position: DecorationPosition,
  text: string
) {
  if (css[position] == undefined || css[position] == null) {
    css[position] = {
      margin: "0.5em",
    };
  }
  css[position]!.contentText = text;
}
function createType(
  options: DecorationInstanceRenderOptions
): TextEditorDecorationType {
  return window.createTextEditorDecorationType(options);
}
