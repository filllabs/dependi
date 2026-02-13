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
import { disableLockFileParsing } from "./commands/lock-file/disableLockFileParsing";
import { enableLockFileParsing } from "./commands/lock-file/enableLockFileParsing";
import { lockFileParsed } from "./commands/lock-file/lockFileParsed";
import { replaceVersion } from "./commands/replacers/replaceVersion";
import { updateAll } from "./commands/replacers/updateAll";
import { generateCurrentVulnReport } from "./commands/report-generator/generateCurrentVulnReport";
import { generateVulnerabilityReport } from "./commands/report-generator/generateVulnerabilityReport";
import { retry } from "./commands/retry";
import { Settings } from "./config";
import { CurrentLanguage, Language, setLanguage } from "./core/Language";
import listener from "./core/listeners";
import { DependencyCache } from "./core/listeners/listener";
import { ChangelogPanel } from "./panels/ChangelogPanel";
import { WelcomePagePanel } from "./panels/WelcomePanel";
import { ExtensionStorage } from "./storage";
import { reloadPref } from "./ui/pref";

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
    switch (true) {
      case e.affectsConfiguration("dependi.npm.unstableFilter"):
        DependencyCache.delete(Language.JS);
        break;
      case e.affectsConfiguration("dependi.python.unstableFilter"):
        DependencyCache.delete(Language.Python);
        break;
      case e.affectsConfiguration("dependi.rust.unstableFilter"):
        DependencyCache.delete(Language.Rust);
        break;
      case e.affectsConfiguration("dependi.go.unstableFilter"):
        DependencyCache.delete(Language.Golang);
        break;
      case e.affectsConfiguration("dependi.php.unstableFilter"):
        DependencyCache.delete(Language.PHP);
        break;
      case e.affectsConfiguration("dependi.dart.unstableFilter"):
        DependencyCache.delete(Language.Dart);
        break;
      case e.affectsConfiguration("dependi.csharp.unstableFilter"):
        DependencyCache.delete(Language.CSharp);
        break;
      case e.affectsConfiguration("dependi.decoration"):
        reloadPref();
        if (window.activeTextEditor) {
          listener(window.activeTextEditor);
        }
        break;
      default:
        break;
    }
  });

  setLanguage(window.activeTextEditor?.document.fileName);

  // Defer initial listener to avoid race condition with NPM task detection (issue #283).
  // Running immediately can interfere with npm's package.json parsing in monorepos.
  configure(context).finally(() => {
    const fileName = window.activeTextEditor?.document.fileName ?? "";
    const isPackageJson = fileName.endsWith("package.json");
    if (isPackageJson) {
      setTimeout(() => listener(window.activeTextEditor), 500);
    } else {
      listener(window.activeTextEditor);
    }
  });

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
    "requirements-dev.txt",
    "pyproject.toml",
    "pubspec.yaml",
    "directory.build.props",
    "directory.packages.props",
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
    if (!Settings.extras.silenceUpdateMessages) {
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
    }
    await lt.setShownVersion(context.extension.packageJSON.version);
  }
}
