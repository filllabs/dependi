"use strict";
/**
 * This extension helps to manage crate dependency versions.
 */
import {
  ExtensionContext,
  OutputChannel,
  ProgressLocation,
  TextDocumentChangeEvent,
  window,
  workspace,
} from "vscode";
import { replaceVersion } from "./commands/replacers/replaceVersion";
import { updateAll } from "./commands/replacers/updateAll";
import { generateCurrentVulnReport } from "./commands/report-generator/generateCurrentVulnReport";
import { generateVulnerabilityReport } from "./commands/report-generator/generateVulnerabilityReport";
import { retry } from "./commands/retry";
import { Settings } from "./config";
import { setLanguage } from "./core/Language";
import listener from "./core/listeners/listener";
import { WelcomePagePanel } from "./panels/WelcomePanel";
import { ExtensionStorage } from "./storage";

export var Logger: OutputChannel;

export function activate(context: ExtensionContext) {

  Logger = window.createOutputChannel("Dependi");
  console.debug('Congratulations, your extension "dependi" is now active!');
  Logger.appendLine('Congratulations, your extension "dependi" is now active!');

  // Add commands

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
      if (e.document.fileName !== window.activeTextEditor?.document.fileName) {
        return;
      }
      console.debug("Text document changed");
      setLanguage(window.activeTextEditor?.document.fileName);
      if (!e.document.isDirty) {
        listener(window.activeTextEditor);
      }
    }),
  );

  console.debug("Adding commands");
  context.subscriptions.push(retry);
  context.subscriptions.push(replaceVersion);
  context.subscriptions.push(updateAll);
  context.subscriptions.push(generateVulnerabilityReport(context));
  context.subscriptions.push(generateCurrentVulnReport(context));
}

export function deactivate() {
  Logger.dispose();
}


async function configure(context: ExtensionContext) {
  const lt = new ExtensionStorage(context);
  const deviceID = await lt.initDeviceID();
  Settings.api.deviceID = deviceID;
  Settings.version = context.extension.packageJSON.version;

  if (lt.isFirstInstall()) {
    Logger.appendLine("First install");
    WelcomePagePanel.render(context);
    await lt.setShownVersion(Settings.version);
  } else if (lt.shouldShowWelcomePage(context.extension.packageJSON.version)) {
    Logger.appendLine("Updated version");
    window.withProgress(
      {
        title: "Dependi has been updated to a new version. See the [CHANGELOG!](https://github.com/filllabs/dependi/blob/main/vscode/CHANGELOG.md)",
        cancellable: true,
        location: ProgressLocation.Notification,
      },
      async () => {
        await new Promise<void>(async (resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      }
    );
    await lt.setShownVersion(context.extension.packageJSON.version);
  }
}

