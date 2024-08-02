import path from 'path';
import { sendTelemetry } from '../api/telemetry/telemetry';
import { env } from 'vscode';

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
            return setLanguageConfig(Language.Rust, "rust", filename, OCVEnvironment.Cratesio);
        case "go.mod":
            return setLanguageConfig(Language.Golang, "go", filename, OCVEnvironment.Go);
        case "package.json":
            return setLanguageConfig(Language.JS, "npm", filename, OCVEnvironment.Npm);
        case "requirements.txt":
            return setLanguageConfig(Language.Python, "python", filename, OCVEnvironment.Pypi);
        case "composer.json":
            return setLanguageConfig(Language.PHP, "php", filename, OCVEnvironment.Packagist);
        case "pyproject.toml":
            return setLanguageConfig(Language.Python, "python", filename, OCVEnvironment.Pypi);
    }
};

function setLanguageConfig(language: Language, config: string, filename: string, OCVenv: OCVEnvironment) {
    CurrentLanguage = language;
    CurrentLanguageConfig = config;
    CurrentEnvironment = OCVenv;
    if (env.isTelemetryEnabled) 
        sendTelemetry({FileName: filename})
    return language;
}
