import path from 'path';
import { sendTelemetry } from '../api/telemetry/telemetry';
import { commands, env } from 'vscode';
import { Settings } from '../config';

export enum Language {
    None = 0,
    Rust = 1,
    Golang = 2,
    JS = 3,
    Python = 4,
    PHP = 5,
    Dart = 6,
    CSharp = 7,
    PnpmWorkspace = 8,
}

export enum OCVEnvironment {
    Cratesio = "crates.io",
    Npm = "npm",
    Packagist = "Packagist",
    Pypi = "PyPI",
    Go = "Go",
    Dart = "Pub",
    Nuget = "NuGet",
}
export var CurrentLanguage: Language = Language.None;
export var CurrentLanguageConfig: string = "";
export var CurrentEnvironment: OCVEnvironment = OCVEnvironment.Cratesio;

export function setLanguage(file?: string) {
    if (!file) {
        CurrentLanguage = Language.None;
        return;
    }
    const filename = path.basename(file);
    const fileExtension = path.extname(filename);
    switch (filename.toLowerCase()) {
        case "cargo.toml":
            return setLanguageConfig(Language.Rust, "rust", filename, OCVEnvironment.Cratesio, Settings.rust.lockFileEnabled);
        case "go.mod":
            return setLanguageConfig(Language.Golang, "go", filename, OCVEnvironment.Go);
        case "package.json":
            return setLanguageConfig(Language.JS, "npm", filename, OCVEnvironment.Npm, Settings.npm.lockFileEnabled);
        case "pnpm-workspace.yaml":
            return setLanguageConfig(Language.PnpmWorkspace, "npm", filename, OCVEnvironment.Npm);
        case "composer.json":
            return setLanguageConfig(Language.PHP, "php", filename, OCVEnvironment.Packagist, Settings.php.lockFileEnabled);
        case "pyproject.toml":
            return setLanguageConfig(Language.Python, "python", filename, OCVEnvironment.Pypi, Settings.python.lockFileEnabled);
        case "pixi.toml":
            return setLanguageConfig(Language.Python, "python", filename, OCVEnvironment.Pypi, Settings.python.lockFileEnabled);
        case "pubspec.yaml":
            return setLanguageConfig(Language.Dart, "dart", filename, OCVEnvironment.Dart);
        case "directory.build.props":
        case "directory.packages.props":
            return setLanguageConfig(Language.CSharp, "csharp", filename, OCVEnvironment.Nuget); 
        default:
            if (fileExtension === ".csproj") {
                return setLanguageConfig(Language.CSharp, "csharp", filename, OCVEnvironment.Nuget);
            }
            if ((fileExtension === ".txt" || fileExtension === ".in") && filename.toLowerCase().startsWith("requirement")) {
                return setLanguageConfig(Language.Python, "python", filename, OCVEnvironment.Pypi, Settings.python.lockFileEnabled);
            }
    }
};

function setLanguageConfig(language: Language, config: string, filename: string, OCVenv: OCVEnvironment, isLockFileEnabled?: boolean) {
    CurrentLanguage = language;
    CurrentLanguageConfig = config;
    CurrentEnvironment = OCVenv;
    commands.executeCommand("setContext", "dependi.supportedFiles", [filename]);
    if (env.isTelemetryEnabled) 
        sendTelemetry({FileName: filename})
    if (isLockFileEnabled !== undefined) {
        commands.executeCommand("setContext", "dependi.hasLockFile", false);
        commands.executeCommand("setContext", "dependi.isEnableLockParsing", isLockFileEnabled);
    }
    return language;
}
