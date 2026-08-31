# Change Log

All notable changes to the Dependi Zed extension will be documented in this file.

## [v1.50.0](https://github.com/filllabs/dependi/compare/zed-v0.1.5...zed-v1.50.0)

### New Features

- First feature-complete Zed port of Dependi, version-aligned with VS Code **1.50.0**: latest versions, vulnerability hints, hover details, and update actions in the same manifests as VS Code.
- Inlay hints for compatible, outdated, patch, and error versions, plus vulnerability counts. Hover a version for registry / docs links and OSV IDs.
- Code actions (`cmd-.`) and code lenses for update one, update all, retry, lock-file toggle, and vulnerability reports (current and vs latest commit).
- Settings under `lsp.dependi.settings` use the same keys as VS Code (without the `dependi.` prefix). Nested objects or dotted keys both work.
- Bundled fallback languages (`Dependi Manifest`, `Pip Requirements`) plus Plain Text attachment so every VS Code manifest works without extra Zed language extensions: `Cargo.toml`, `go.mod`, `package.json`, `deno.json` / `deno.jsonc`, `pnpm-workspace.yaml`, `composer.json`, `pyproject.toml`, `pixi.toml`, `requirements*.txt` / `requirements*.in`, `pubspec.yaml`, `mix.exs`, `build.gradle` / `build.gradle.kts`, `libs.versions.toml`, `gradle-wrapper.properties`, `*.csproj` / `*.fsproj`, `Directory.Build.props` / `Directory.Packages.props`, `*.tf`.
- Rust/TOML: TOML 1.1 multiline inline tables in `Cargo.toml`. ([Issue #306](https://github.com/filllabs/dependi/issues/306))

### Bug Fixes

- NPM: Pre-release-only packages and `dist-tags.latest` handled correctly. ([Issue #282](https://github.com/filllabs/dependi/issues/282))
- Rust: Git and path dependencies ignored in table form and multiline inline tables. ([Issue #183](https://github.com/filllabs/dependi/issues/183))
- Python: Exact pins and `poetry.lock` / `uv.lock` versions are not treated as caret ranges. ([Issue #223](https://github.com/filllabs/dependi/issues/223))
- Python: Unstable-version filtering on the Dependi API path uses PEP 440 pre-release detection.

### Notes

- Zed has no VS Code gutter decorations; versions show as inlay hints. `decoration.*.style` CSS is ignored; `decoration.*.template` still applies.
- Enable `"inlay_hints": { "enabled": true }` and `"code_lens": "on"` in Zed settings if hints or lenses are hidden.
