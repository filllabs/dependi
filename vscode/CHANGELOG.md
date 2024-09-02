# Change Log

All notable changes to the "dependi" extension will be documented in this file.

## [v0.7.9](https://github.com/filllabs/dependi/compare/v0.7.8...v0.7.9)

### Improvements

- New advanced vulnerability report. (_Only for [Pro](https://dependi.io) version._)
- CHANGELOG cleanup and formatting.
- Notification for dependi updates now has a beaituful CHANGELOG view.

### Bug Fixes

- Fixed issue with `*` version not showing package versions. [Issue 118](https://github.com/filllabs/dependi/issues/118)

## [v0.7.8](https://github.com/filllabs/dependi/compare/v0.7.7...v0.7.8)

### New Features

- Version checks now use lock file versions instead of manifest file versions.

### Added

- Telemetry support added. Details are documented in the [`README.md`](https://github.com/filllabs/dependi/blob/main/vscode/README.md) file.

## [v0.7.7](https://github.com/filllabs/dependi/compare/v0.7.6...v0.7.7)

### New Features

- Updated "ignore line pattern" to support multiple patterns.
- Logging added to output channel for better debugging and error handling.
- Report , Update and Retry menu added to the title bar.
- Patterns added to the dependi settings for index server URLs

### Bug Fixes

- Fixed parsing issue with certain version strings. [Issue #77](https://github.com/filllabs/dependi/issues/77)
- Fixed the bug in the dependency module to ensure correct functionality. [Issue #80](https://github.com/filllabs/dependi/issues/80)
- Fixed bug in the dependency resolution module. [Issue #74](https://github.com/filllabs/dependi/issues/74)
- Fixed: Added an output channel for improved logging and debugging. [Issue #84](https://github.com/filllabs/dependi/issues/82)
- Fixed: Issue with changing versions in requirements.txt. [Issue #76](https://github.com/filllabs/dependi/issues/76)

## [v0.7.6](https://github.com/filllabs/dependi/compare/v0.7.5...v0.7.6)

### New Features

- Added a report to list vulnerable library versions from the manifest file. (_Only for [Pro](https://dependi.io) version._) [Issue #53](https://github.com/filllabs/dependi/issues/53)

### Bug Fixes

- Fixed local dependency errors now it wil ignore. [Issue #52](https://github.com/filllabs/dependi/issues/52)
- Better error handling.
- Wildcard version support added for TOML files. [Issue #59](https://github.com/filllabs/dependi/issues/59)
- Fixed resolved issue where outdated packages appeared as up-to-date. [Issue #60](https://github.com/filllabs/dependi/issues/60)
- Fixed incorrect node linking in dependency graph. [Issue #66](https://github.com/filllabs/dependi/issues/66)

### Improvements

- Fixed the incorrect ordering of pre-release Python versions. [Issue #58](https://github.com/filllabs/dependi/issues/58)

## [v0.7.5](https://github.com/filllabs/dependi/compare/v0.7.4...v0.7.5)

### Bug Fixes

- Update notification added for new versions instead of welcome page
- Even Better TOML extension removed from dependencies
- Informing patch updates added as a setting per language. [Issue #13](https://github.com/filllabs/dependi/issues/13)
- Fixed issue Cargo.toml now ignores local libraries. [Issue #29](https://github.com/filllabs/dependi/issues/29)
- Added support for pyproject.toml in Python language. [Issue #12](https://github.com/filllabs/dependi/issues/12)

## [v0.7.4](https://github.com/filllabs/dependi/compare/v0.7.3...v0.7.4)

### New Features

- PHP support added [PR #21](https://github.com/filllabs/dependi/pull/21)
- Language specific enable/disable settings added [Issue #11](https://github.com/filllabs/dependi/issues/11)
- Fetching dependencies notification silenced to status bar spinner [Issue #34](https://github.com/filllabs/dependi/issues/34)
- GHSA vulnerability is now enabled as default.
- Added support to ignore lines based on specified patterns [Issue #35](https://github.com/filllabs/dependi/issues/35)

### Bug Fixes

- requirements.txt file parsing bug fixed [Issue #23](https://github.com/filllabs/dependi/issues/23)
- Welcome Page silenced on updates.

## [v0.7.3](https://github.com/filllabs/dependi/compare/v0.7.2...v0.7.3)

### Bug Fixes

- Fixed vulnerability report generate command bug (_Only for [Pro](https://dependi.io) version._) ([#30](https://github.com/filllabs/dependi/pull/30))
- Fixed duplicate slashes in npm registry url([#31](https://github.com/filllabs/dependi/pull/31) Thanks to [Opportunity](https://github.com/OpportunityLiu))

## [v0.7.2](https://github.com/filllabs/dependi/compare/v0.7.1...v0.7.2)

### Other Changes

- Removed the upper limit for version numbers. Now version numbers can be larger([#10](https://github.com/filllabs/dependi/issues/10))

## [v0.7.1](https://github.com/filllabs/dependi/compare/v0.7.v0...v0.7.1)

### Bug Fixes

- Fixed issue with excessive fetching: optimize dependency check([699db85](https://github.com/filllabs/dependi/pull/5))

### Other Changes

- Updated README.md file

## [v0.7.0](https://github.com/filllabs/dependi/compare/v0.6.v0...v0.7.0)

### New Features

- Language Support: Dependi now supports Go, JavaScript, and Python!
- Vulnerability Report: A new feature for Pro users. (_Only for [Pro](https://dependi.io) version._)

### Improvements

- Improved cache support.

### Bug Fixes

- General bug fixes.
- Fixed go.mod decorator bug ([#2](https://github.com/filllabs/dependi/pull/2))
- Fixed retry command bug ([9f105dc](https://github.com/filllabs/dependi/commit/9f105dc347d66d33acf9e63c4c09d96206ae6e4c))

### Other Changes

- Version info decorator placement can now be changed from extension settings.

### Improvements

- Improved cache support.

### Bug Fixes

- General bug fixes.
- Fixed go.mod decorator bug ([#2](https://github.com/filllabs/dependi/pull/2))
- Fixed retry command bug ([9f105dc](https://github.com/filllabs/dependi/commit/9f105dc347d66d33acf9e63c4c09d96206ae6e4c))

### Other Changes

- Version info decorator placement can now be changed from extension settings.
