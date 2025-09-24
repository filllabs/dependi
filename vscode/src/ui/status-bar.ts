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
  setText: (t: Type, name?: string, noDialog?: boolean) => void;
  fetching: (indexServerURL: string) => void;
}

const __safeVSCodeWindow: any = (typeof window !== "undefined" && (window as any)) || {};
const __rawStatusBarItem = (
  __safeVSCodeWindow.createStatusBarItem
    ? __safeVSCodeWindow.createStatusBarItem(StatusBarAlignment.Right, -1000)
    : {
        text: "",
        tooltip: "",
        color: "",
        command: undefined,
        show() {},
        hide() {}
      }
) as StatusBarItemExt;

export const StatusBar: StatusBarItemExt = __rawStatusBarItem;
StatusBar.setText = (t: Type, text?: string, noDialog: boolean = false) => {
  switch (t) {
    case "Error":
      StatusBar.color = "statusBarItem.errorForeground";
      StatusBar.text = "$(error) Dependi";
      if (noDialog) {
        StatusBar.tooltip = text || "Error";
        return;
      } else {
        StatusBar.tooltip = "";
        window.showErrorMessage(text || "Error");
        return;
      }
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
  StatusBar.tooltip = "👀 Fetching " + indexServerURL.replace(/^https?:\/\//, "");
  StatusBar.command = Configs.RETRY;
};
export default {
  StatusBar
};
