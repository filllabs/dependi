"use strict";
/**
 * This extension helps to manage crate dependency versions.
 */
import {
  commands,
  ExtensionContext,
  OutputChannel,
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
import { CurrentLanguage, Language, setLanguage } from "./core/Language";
import listener from "./core/listeners";
import { ChangelogPanel } from "./panels/ChangelogPanel";
import { WelcomePagePanel } from "./panels/WelcomePanel";
import { ExtensionStorage } from "./storage";
import { disableLockFileParsing } from "./commands/lock-file/disableLockFileParsing";
import { enableLockFileParsing } from "./commands/lock-file/enableLockFileParsing";
import { lockFileParsed } from "./commands/lock-file/lockFileParsed";


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

  configure(context).finally(() => listener(window.activeTextEditor));

  // Add listeners
  context.subscriptions.push(
    // Add active text editor listener and run once on start.
    window.onDidChangeActiveTextEditor((e) => {
      setLanguage(window.activeTextEditor?.document.fileName);
      if (CurrentLanguage === Language.None) {
        return;
      }
      console.debug("Active text editor changed", CurrentLanguage);
      return listener(e);
    }),
    // When the text document is changed, fetch + check dependencies
    workspace.onDidChangeTextDocument((e: TextDocumentChangeEvent) => {
      if (e.document.fileName !== window.activeTextEditor?.document.fileName) {
        return;
      }
      if (CurrentLanguage === Language.None) {
        return;
      }
      setLanguage(window.activeTextEditor?.document.fileName);
      console.debug("Text document changed", CurrentLanguage);
      if (!e.document.isDirty) {
        listener(window.activeTextEditor);
      }
    })
  );
  // add supported file names  according to the language settings
  commands.executeCommand("setContext", "dependi.supportedFiles", [
    "Cargo.toml",
    "go.mod",
    "package.json",
    "composer.json",
    "requirements.txt",
    "pyproject.toml",
  ]);

  console.debug("Adding commands");
  context.subscriptions.push(retry);
  context.subscriptions.push(replaceVersion);
  context.subscriptions.push(updateAll);
  context.subscriptions.push(generateVulnerabilityReport(context));
  context.subscriptions.push(generateCurrentVulnReport(context));
  context.subscriptions.push(disableLockFileParsing);
  context.subscriptions.push(enableLockFileParsing);
  context.subscriptions.push(lockFileParsed);
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
    window
      .showInformationMessage(
        "Dependi has been updated to a new version. See the CHANGELOG!",
        "Show Changelog",
        "Dismiss"
      )
      .then((selection) => {
        if (selection === "Show Changelog") {
          ChangelogPanel.render(context);
        }
      });
    await lt.setShownVersion(context.extension.packageJSON.version);
  }
}
