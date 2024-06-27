import { commands, window } from "vscode";
import { Configs, DEPENDI, Settings } from "../config";

const buttons = {
  settings: "Open settings",
  dashboard: "Go to Dashboard"
};

async function openDialog(message: string, actions: Record<string, any>) {
  return window.showErrorMessage(message, ...Object.keys(actions))
    .then(async (value) => {
      await actions[value ?? ""]?.();
    });
}

export function openDeviceLimitDialog() {
  openDialog("Device Limit reached. You can edit your api key or visit dependi.io dashboard to manage devices.", {
    [buttons.settings]: () => commands.executeCommand('workbench.action.openSettingsJson', { revealSetting: { key: DEPENDI + Configs.INDEX_SERVER_API_KEY, edit: true } }),
    [buttons.dashboard]: () => commands.executeCommand('vscode.open', `${Settings.api.proPanelURL}/api-key-management`)
  });
}

export function openPaymentRequiredDialog() {
  openDialog("Payment required. Please visit dependi.io dashboard to update your payment method.", {
    [buttons.dashboard]: () => commands.executeCommand('vscode.open', `${Settings.api.proPanelURL}/payments`)
  });
}

export function openSettingsDialog(key: string, message: string) {
  openDialog(message, {
    "Open settings": () => commands.executeCommand('workbench.action.openSettingsJson', { revealSetting: { key: DEPENDI + key, edit: true } })
  });
}

export function openUserNotActive() {
  openDialog("User is not active. Please check emails from us or visit dependi.io dashboard.", {
    [buttons.settings]: () => commands.executeCommand('workbench.action.openSettingsJson', { revealSetting: { key: DEPENDI + Configs.INDEX_SERVER_API_KEY, edit: true } }),
    [buttons.dashboard]: () => commands.executeCommand('vscode.open', `${Settings.api.proPanelURL}/dashboard`)
  });
}