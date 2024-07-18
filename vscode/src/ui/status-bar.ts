/**
 * A utility to manage Status Bar operations.
 */
import { StatusBarAlignment, StatusBarItem, window } from "vscode";
import { Configs } from "../config";

type Type = "Error" | "Warning" | "Info" | "Loading";

/**
 * Extends StatusBarItem in order to add support prefixed text changes.
 */
interface StatusBarItemExt extends StatusBarItem {
  setText: (t: Type, name?: string) => void;
  fetching: (indexServerURL: string) => void;
}

export const StatusBar: StatusBarItemExt = window.createStatusBarItem(
  StatusBarAlignment.Right,
  -1000
) as StatusBarItemExt;
StatusBar.setText = (t: Type, text?: string) => {
  switch (t) {
    case "Error":
      StatusBar.color = "statusBarItem.errorForeground";
      StatusBar.text = "$(error) Dependi";
      StatusBar.tooltip = "";
      window.showErrorMessage(text || "Error");
      return;
    case "Warning":
      StatusBar.text = "$(warning) Dependi";
      StatusBar.color = "statusBarItem.warningForeground";
      break;
    case "Info":
      StatusBar.color = "statusBarItem.foreground";
      StatusBar.text = "$(check-all) Dependi";
      break;
    case "Loading":
      StatusBar.color = "statusBarItem.activeForeground";
      StatusBar.text = "$(sync~spin) Dependi";
  }
  if (text) {
    window.setStatusBarMessage(`Dependi: ${text}`, 2000);
  }
  StatusBar.tooltip = text;
  StatusBar.command = Configs.RETRY;
};

StatusBar.fetching = (indexServerURL: string) => {
  StatusBar.color = "statusBarItem.activeForeground";
  StatusBar.text = "$(sync~spin) Dependi";
  StatusBar.tooltip = "👀 Fetching " + indexServerURL.replace(/^https?:\/\//, '');
  StatusBar.command = Configs.RETRY;
};
export default {
  StatusBar,
};
