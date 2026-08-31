# Dependi for Zed

Zed port of [Dependi](https://www.dependi.io). It shows latest versions, highlights vulnerabilities, and offers update actions in supported manifest files.

Zed does not support VS Code-style inline decorations, so versions are shown as **inlay hints**, details on **hover**, and updates via **code actions** / **code lenses**. The VS Code toolbar commands (retry, update all, lock file toggle, vulnerability reports) are available the same way and can be bound in `keymap.json`.

## Supported files

- Rust: `Cargo.toml`
- JavaScript / TypeScript: `package.json`, `deno.json`, `deno.jsonc`, `pnpm-workspace.yaml`
- Go: `go.mod`
- Python: `pyproject.toml`, `pixi.toml`, `requirements*.txt`, `requirements*.in`
- PHP: `composer.json`
- Dart: `pubspec.yaml`
- C# / F#: `*.csproj`, `*.fsproj`, `Directory.Build.props`, `Directory.Packages.props`
- Elixir: `mix.exs`
- Gradle: `build.gradle`, `build.gradle.kts`, `libs.versions.toml`, `gradle-wrapper.properties`
- Terraform: `*.tf`

## Develop locally

1. Install [Rust via rustup](https://rustup.rs/) (Zed compiles the `wasm32-wasip2` Wasm). Homebrew `rust` is not enough — rustup must own `cargo`/`rustc`, and `wasm32-wasip2` must be installed:

```sh
rustup target add wasm32-wasip2
```
2. Build the language server **before** installing the extension. Zed copies the extension into an empty work directory, so the JS must be compiled first (it is embedded into the Wasm):

```sh
cd zed/server
npm install
npm run build
```

3. In Zed, run `zed: install dev extension` and select this `zed` folder.
4. Enable inlay hints if they are off:

```json
{
  "inlay_hints": {
    "enabled": true
  },
  "code_lens": "on"
}
```

## Settings

Add options under `lsp.dependi.settings` **inside your existing** `settings.json` object. Do not wrap another `{` around the whole file.

```json
{
  "lsp": {
    "dependi": {
      "settings": {
        "apiURL": "https://index.dependi.io",
        "apiKey": "",
        "vulnerability.enabled": true,
        "rust.enabled": true,
        "npm.enabled": true
      }
    }
  }
}
```

Nested objects also work, for example `"rust": { "enabled": true, "unstableFilter": "Exclude" }`.

## Features

- Inlay hints for compatible, outdated, patch, and error versions, plus vulnerability counts
- Hover with version lists, registry / docs links, and OSV vulnerability IDs
- Code actions (`cmd-.`) to apply a version — Zed cannot run VS Code `command:` hover links
- Code action to apply any of the recent versions, or update all dependencies
- The same commands as the VS Code toolbar / command palette:
  - Retry to fetch dependencies
  - Update all dependencies
  - Enable / disable lock file parsing
  - Generate a vulnerability report for current dependencies
  - Generate a vulnerability report compared to the latest commit

VS Code does not assign default keyboard shortcuts for these. In Zed they show as **code lenses** (top of the file) and **code actions**. Enable lenses with `"code_lens": "on"` if they are hidden.

To bind them in `keymap.json`:

```json
[
  {
    "context": "Editor && !VimControl",
    "bindings": {
      "cmd-alt-u": ["editor::CodeAction", { "kind": "source.dependi.updateAll", "apply": "first" }],
      "cmd-alt-r": ["editor::CodeAction", { "kind": "source.dependi.retry", "apply": "first" }],
      "cmd-alt-v": ["editor::CodeAction", { "kind": "source.dependi.vulnerability.currentReport", "apply": "first" }],
      "cmd-alt-shift-v": ["editor::CodeAction", { "kind": "source.dependi.vulnerability.report", "apply": "first" }],
      "cmd-alt-l": ["editor::CodeAction", { "kind": "source.dependi.enableLockFileParsing", "apply": "first" }],
      "cmd-alt-shift-l": ["editor::CodeAction", { "kind": "source.dependi.disableLockFileParsing", "apply": "first" }]
    }
  }
]
```

On Linux/Windows use `ctrl-alt-*` instead of `cmd-alt-*`. You can also run **editor: Toggle Code Actions** on a manifest file.

Vulnerability reports are saved as HTML and opened if the editor supports it. Lock file toggling lasts for the current session; persist it with `lsp.dependi.settings.rust.lockFileEnabled` (or `npm` / `php` / `python` / `dart` / `csharp` / `elixir`).

## Troubleshooting

- If the language server does not start or files are not decorated, rebuild `zed/server` (`npm run build`) and **reinstall** the dev extension. The JS is embedded in the Wasm, so copying files into the work dir is not enough.
- Zed has no VS Code-style gutter decorations. Versions appear as **inlay hints** (✅ / ❌ / ⚠️) at the end of the dependency line. Hover a version string for details; use code actions to update.
- Dependi attaches to Zed's built-in languages (TOML, JSON, YAML, Plain Text) and ships fallback languages (`Dependi Manifest`, `Pip Requirements`) so `go.mod`, `mix.exs`, Gradle, Terraform, `*.csproj` / `*.fsproj` / `*.props`, and `requirements.*` work without extra extensions. Installing Go / Elixir / Gradle / Terraform still improves highlighting; Dependi attaches either way.
- To highlight `requirements.txt` as Python (this can also start Pyright), add `"file_types": { "Python": ["**/requirements*.txt", "**/requirements*.in"] }`.

## Publishing

Zed ships extensions from [zed-industries/extensions](https://github.com/zed-industries/extensions). This repo opens a PR there; it does not upload a package to a registry.

1. Commit `zed/bin/dependi-language-server.js` (produced by `cd zed/server && npm ci && npm run build`). Zed compiles Wasm from git and embeds that file.
2. Keep `zed/LICENSE` (MIT). Zed only accepts licenses in the extension path, not the repo root.
3. Add repo secret `ZED_EXTENSIONS_TOKEN` — a PAT with `repo` and `workflow` scopes that can push to the extensions fork.
4. Fork [zed-industries/extensions](https://github.com/zed-industries/extensions) to `filllabs/extensions`, or set Actions variable `ZED_EXTENSIONS_FORK` to `owner/repo`.
5. This release is `1.50.0` (greater than the marketplace third-party `dependi` at `1.10.0`; Zed CI rejects decreases).
6. Tag a Zed release and push it (do not reuse VS Code `v*` tags). The tag must match the manifest, e.g. version `1.50.0` → `zed-v1.50.0`:

```sh
git tag zed-v1.50.0
git push origin zed-v1.50.0
```

The workflow also runs from **Actions → Publish Zed Extension → Run workflow**. The PR updates submodule `extensions/dependi` to this repository at path `zed` and retargets it away from the current third-party listing. Zed staff may need to approve that ownership change.
