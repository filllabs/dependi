import path from 'path';
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
            CurrentLanguage = Language.Rust;
            CurrentLanguageConfig = "rust";
            CurrentEnvironment = OCVEnvironment.Cratesio;
            return Language.Rust;
        case "go.mod":
            CurrentLanguage = Language.Golang;
            CurrentLanguageConfig = "go";
            CurrentEnvironment = OCVEnvironment.Go;
            return Language.Golang;
        case "package.json":
            CurrentLanguage = Language.JS;
            CurrentLanguageConfig = "npm";
            CurrentEnvironment = OCVEnvironment.Npm;
            return Language.JS;
        case "requirements.txt":
            CurrentLanguage = Language.Python;
            CurrentLanguageConfig = "python";
            CurrentEnvironment = OCVEnvironment.Pypi;
            return Language.Python;
        case "composer.json":
            CurrentLanguage = Language.PHP;
            CurrentLanguageConfig = "php";
            CurrentEnvironment = OCVEnvironment.Packagist;
            return Language.PHP;
        case "pyproject.toml":
            CurrentLanguage = Language.Python;
            CurrentLanguageConfig = "python";
            CurrentEnvironment = OCVEnvironment.Pypi;
            return Language.Python;
    }
};
