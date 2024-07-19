import path from 'path';
export enum Language {
    None = 0,
    Rust = 1,
    Golang = 2,
    JS = 3,
    Python = 4,
    PHP = 5,
}
export var CurrentLanguage: Language = Language.None;
export var CurrentLanguageConfig: string = "";

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
            return Language.Rust;
        case "go.mod":
            CurrentLanguage = Language.Golang;
            CurrentLanguageConfig = "go";
            return Language.Golang;
        case "package.json":
            CurrentLanguage = Language.JS;
            CurrentLanguageConfig = "npm";
            return Language.JS;
        case "requirements.txt":
            CurrentLanguage = Language.Python;
            CurrentLanguageConfig = "python";
            return Language.Python;
        case "composer.json":
            CurrentLanguage = Language.PHP;
            CurrentLanguageConfig = "php";
            return Language.PHP;
    }
};
