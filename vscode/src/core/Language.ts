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
}

export enum OCVEnvironment {
    Cratesio = "crates.io",
    Npm = "npm",
    Packagist = "Packagist",
    Pypi = "PyPI",
    Go = "Go",
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
    switch (filename.toLowerCase()) {
        case "cargo.toml":
            return setLanguageConfig(Language.Rust, "rust", filename, OCVEnvironment.Cratesio, Settings.rust.lockFileEnabled);
        case "go.mod":
            return setLanguageConfig(Language.Golang, "go", filename, OCVEnvironment.Go);
        case "package.json":
            return setLanguageConfig(Language.JS, "npm", filename, OCVEnvironment.Npm, Settings.npm.lockFileEnabled);
        case "requirements.txt":
        case "requirements-dev.txt":
            return setLanguageConfig(Language.Python, "python", filename, OCVEnvironment.Pypi);
        case "composer.json":
            return setLanguageConfig(Language.PHP, "php", filename, OCVEnvironment.Packagist, Settings.php.lockFileEnabled);
        case "pyproject.toml":
            return setLanguageConfig(Language.Python, "python", filename, OCVEnvironment.Pypi, Settings.python.lockFileEnabled);
    }
};

function setLanguageConfig(language: Language, config: string, filename: string, OCVenv: OCVEnvironment, isLockFileEnabled?: boolean) {
    CurrentLanguage = language;
    CurrentLanguageConfig = config;
    CurrentEnvironment = OCVenv;
    if (env.isTelemetryEnabled) 
        sendTelemetry({FileName: filename})
    if (isLockFileEnabled !== undefined) {
        commands.executeCommand("setContext", "dependi.hasLockFile", false);
        commands.executeCommand("setContext", "dependi.isEnableLockParsing", isLockFileEnabled);
    }
    return language;
}
