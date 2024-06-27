"use strict";
/**
 * This extension helps to manage crate dependency versions.
 */
import {
  ExtensionContext,
  TextDocumentChangeEvent,
  window,
  workspace,
} from "vscode";
import { replaceVersion } from "./commands/replacers/replaceVersion";
import { updateAll } from "./commands/replacers/updateAll";
import { generateVulnerabilityReport } from "./commands/report-generator/generateVulnerabilityReport";
import { Settings } from "./config";
import { setLanguage } from "./core/Language";
import listener from "./core/listeners/listener";
import { WelcomePagePanel } from "./panels/WelcomePanel";
import { ExtensionStorage } from "./storage";


export function activate(context: ExtensionContext) {

  console.debug('Congratulations, your extension "dependi" is now active!');

  // Load settings and listen for changes
  Settings.load();
  workspace.onDidChangeConfiguration((e) => {
    Settings.onChange(e);
  });

  setLanguage(window.activeTextEditor?.document.fileName);

  configure(context).finally(
    () => listener(window.activeTextEditor)
  );

  // Add listeners
  context.subscriptions.push(
    // Add active text editor listener and run once on start.
    window.onDidChangeActiveTextEditor(
      (e) => {
        console.debug("Active text editor changed");
        setLanguage(window.activeTextEditor?.document.fileName);
        return listener(e);
      }),
    // When the text document is changed, fetch + check dependencies
    workspace.onDidChangeTextDocument((e: TextDocumentChangeEvent) => {
      console.debug("Text document changed");
      setLanguage(window.activeTextEditor?.document.fileName);
      if (!e.document.isDirty) {
        listener(window.activeTextEditor);
      }
    }),
  );


  // Add commands
  context.subscriptions.push(replaceVersion);
  context.subscriptions.push(updateAll);
  context.subscriptions.push(generateVulnerabilityReport(context));
}

export function deactivate() {

}


async function configure(context: ExtensionContext) {
  const lt = new ExtensionStorage(context);
  const deviceID = await lt.initDeviceID();
  Settings.api.deviceID = deviceID;
  Settings.version = context.extension.packageJSON.version;

  if (lt.isFirstInstall()) {
    console.debug("First install");
    WelcomePagePanel.render(context);
    await lt.setShownVersion(Settings.version);
  } else if (lt.shouldShowWelcomePage(context.extension.packageJSON.version)) {
    console.debug("Updated version");
    // TODO: open different page for updated version
    WelcomePagePanel.render(context);
    await lt.setShownVersion(context.extension.packageJSON.version);
  }
}



