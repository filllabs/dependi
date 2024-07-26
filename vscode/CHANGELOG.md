# Change Log

All notable changes to the "dependi" extension will be documented in this file.

## 0.7.6

### New Features

- Added a report to list vulnerable library versions from the manifest file. [Issue #53](https://github.com/filllabs/dependi/issues/53)

### Bug Fixes

- Fixed local dependency errors now it wil ignore. [Issue #52](https://github.com/filllabs/dependi/issues/52)

- Better error handling.

- Wildcard version support added for TOML files. [Issue #59](https://github.com/filllabs/dependi/issues/59)

- Fixed resolved issue where outdated packages appeared as up-to-date. [Issue #60](https://github.com/filllabs/dependi/issues/60)

- Fixed incorrect node linking in dependency graph. [Issue #66](https://github.com/filllabs/dependi/issues/66)

## 0.7.5

### Bug Fixes

- Update notification added for new versions instead of welcome page

- Even Better TOML extension removed from dependencies

- Informing patch updates added as a setting per language. [Issue #13](https://github.com/filllabs/dependi/issues/13)

- Fixed issue Cargo.toml now ignores local libraries. [Issue #29](https://github.com/filllabs/dependi/issues/29)

- Added support for pyproject.toml in Python language. [Issue #12](https://github.com/filllabs/dependi/issues/12)

## 0.7.4

### New Features

- PHP support added [PR #21](https://github.com/filllabs/dependi/pull/21)

- Language specific enable/disable settings added [Issue #11](https://github.com/filllabs/dependi/issues/11)

- Fetching dependencies notification silenced to status bar spinner [Issue #34](https://github.com/filllabs/dependi/issues/34)

- GHSA vulnerability is now enabled as default.

- Added support to ignore lines based on specified patterns [Issue #35](https://github.com/filllabs/dependi/issues/35)

### Bug Fixes

- requirements.txt file parsing bug fixed [Issue #23](https://github.com/filllabs/dependi/issues/23)

- Welcome Page silenced on updates.

## 0.7.3

### Bug Fixes

- Fixed vulnerability report generate command bug([#30](https://github.com/filllabs/dependi/pull/30))

- Fixed duplicate slashes in npm registry url([#31](https://github.com/filllabs/dependi/pull/31) Thanks to [Opportunity](https://github.com/OpportunityLiu))

## 0.7.2

### Other Changes

- Removed the upper limit for version numbers. Now version numbers can be larger([#10](https://github.com/filllabs/dependi/issues/10))

## 0.7.1

### Bug Fixes

- Fixed issue with excessive fetching: optimize dependency check([699db85](https://github.com/filllabs/dependi/pull/5))

### Other Changes

- Updated README.md file

## 0.7.0

### New Features

- Language Support: Dependi now supports Go, JavaScript, and Python!

- Vulnerability Report: A new feature for Pro users.

### Improvements

- Improved cache support.

### Bug Fixes

- General bug fixes.
- Fixed go.mod decorator bug ([#2](https://github.com/filllabs/dependi/pull/2))
- Fixed retry command bug ([9f105dc](https://github.com/filllabs/dependi/commit/9f105dc347d66d33acf9e63c4c09d96206ae6e4c))

### Other Changes

- Version info decorator placement can now be changed from extension settings.

## [0.6.4](https://github.com/filllabs/crates/compare/v0.6.3...v0.6.4) (2024-03-26)

### Continuous Integration

- release-please package add ([e082150](https://github.com/filllabs/crates/commit/e08215000182e1b84a884188c0f6fe7f1f4c3c3d))

### Bug Fixes

- update release-please.yml file. ([bfb1248](https://github.com/filllabs/crates/commit/bfb1248607b41ac98cf69ede1cc06376c9573716))

## 0.6.6

- a fix for extension activator [adamtrilling](https://github.com/adamtrilling)

## 0.6.5

- a bug fix for decorator css support [Jacob-32587](https://github.com/Jacob-32587)
- crates-index-server support removed.

## 0.6.4

- decorator css support [Jacob-32587](https://github.com/Jacob-32587)

## 0.6.3

- sparse index yanked fixed. [BarbossHack](https://github.com/BarbossHack)
- better prerelease check. [BarbossHack](https://github.com/BarbossHack)

## 0.6.2

- sparse index support with custom url support added. [BarbossHack](https://github.com/BarbossHack)
- ignore line support for spesific dependencies. [BarbossHack](https://github.com/BarbossHack)
- git conflict marks handled. [BarbossHack](https://github.com/BarbossHack)

## 0.6.0

- github support removed.
- local index support removed.
- crates-index-server support added.
- doc.rs bug with dependency names quoted fixed.
- better error messages, ui and logging.
- dependencies updated.
- minor bug fixes.

## 0.5.8

- Better errors at tooltips. [#126](https://github.com/serayuzgur/crates/pull/126)
- Default local registry branch goes to origin/HEAD and fallback is origin/master.
- Using "?" as version auto updates to latest version on save. Thanks to [William](https://github.com/WilliamVenner)
- Version auto complete is now available [#130](https://github.com/serayuzgur/crates/pull/130). Thanks to [William](https://github.com/WilliamVenner)

## 0.5.7

- Local repository git branch changed to origin/master and also it is changeable from settings `crates.localCargoIndexBranch` [#121](https://github.com/serayuzgur/crates/issues/121)

## 0.5.6

- Comma handled for ranged versions [#117](https://github.com/serayuzgur/crates/issues/117)
- Fix for comments with brackets inside arrays [#115](https://github.com/serayuzgur/crates/pull/115)
- ${version} is not being replaced for compatible decorator [#118](https://github.com/serayuzgur/crates/issues/118)
- Support alternative local index [#109](https://github.com/serayuzgur/crates/issues/109)

## 0.5.5

- "Incorrectly marking 1.4.0 as incompatible with 1.3" fixed [#101](https://github.com/serayuzgur/crates/pull/101)

## 0.5.4

- Failing all decorators on one error fixed [#111](https://github.com/serayuzgur/crates/pull/111)
- "spaces in dependencies" fixed [#105](https://github.com/serayuzgur/crates/pull/105)
- "Support semver symbols" fixed [#104](https://github.com/serayuzgur/crates/pull/104)
- "Accessibility regression" fixed [#100](https://github.com/serayuzgur/crates/pull/100)

## 0.5.3

- "package.metadata.\*" bug fixed [#94](https://github.com/serayuzgur/crates/issues/94)
- Local registry bug fixed [#95](https://github.com/serayuzgur/crates/issues/95)
- New semantic decorators added [#86](https://github.com/serayuzgur/crates/issues/86)

## 0.5.2

- Bundled with webpack

## 0.5.1

- local index path bug fixed [#82](https://github.com/serayuzgur/crates/issues/82)
- crew.dev support and cleaner popup design [#72](https://github.com/serayuzgur/crates/issues/72)

## 0.5.0

- Dependencies updated.
- Local registry index PR merged thanks to [ervinoro](https://github.com/ervinoro)
- New setting added "crates.useLocalCargoIndex" to switch between GithHub and Local index.

## 0.4.8

- Go to DOCS.RS added in popup [#72](https://github.com/serayuzgur/crates/issues/72)
- "0.0.0" version is included now [#73](https://github.com/serayuzgur/crates/issues/73)

## 0.4.7

- Hot Fix

## 0.4.6

- Should not convert single to double quotes [#66](https://github.com/serayuzgur/crates/issues/66)
- Rate limiting should not trigger error messages [#65](https://github.com/serayuzgur/crates/issues/65)
- Fetch Errors and constant error messages when viewing Cargo.toml with conflicts [#61](https://github.com/serayuzgur/crates/issues/61)
- Alert always happen when I add deps to Cargo.toml [#59](https://github.com/serayuzgur/crates/issues/59)
- `No versions found` error should be less intrusive [#58](https://github.com/serayuzgur/crates/issues/58)
- alternative registries are not taken into account [#41](https://github.com/serayuzgur/crates/issues/41)

## 0.4.5

- Github basic authentication support for increasing api rates 5000req/h [#60](https://github.com/serayuzgur/crates/issues/60)

## 0.4.4

- Dependencies updated.
- Certain version numbers cause fetch errors. [#37](https://github.com/serayuzgur/crates/issues/37)
- Buggy rendering for parameterized dependencies [#52](https://github.com/serayuzgur/crates/issues/52)
- ^ versions handled incorrectly [#39](https://github.com/serayuzgur/crates/issues/39)
- Splitting vscode package into @types/vscode and vscode-test [#57](https://github.com/serayuzgur/crates/issues/57)
- Uppercase key seems to be causing an error [#56](https://github.com/serayuzgur/crates/issues/56)

## 0.4.3

- Dependencies updated.
- Number parsing fixed [#50](https://github.com/serayuzgur/crates/issues/50)
- PR [#48](https://github.com/serayuzgur/crates/pull/48) merged. Thanks to [@RensAlthuis](https://github.com/RensAlthuis)

## 0.4.2

- Sorting is now uses version compare. [#45](https://github.com/serayuzgur/crates/issues/45) Thanks to [kupiakos](https://github.com/kupiakos)
- Yanked versions fixed. [#44](https://github.com/serayuzgur/crates/issues/44)

## 0.4.1

- Sorting of the versions fixed. [#43](https://github.com/serayuzgur/crates/issues/43)

## 0.4.0

- All fetches will be done from github api to crates.io-index repository. [#42](https://github.com/serayuzgur/crates/issues/42)
- Dependencies updated.
- Quoted dependency names are supported now. [#40](https://github.com/serayuzgur/crates/issues/40)

## 0.3.7

- Fetch errors for crates with package alias. [#38](https://github.com/serayuzgur/crates/issues/38)

## 0.3.6

- Fetch errors for crate from git link and version. [#36](https://github.com/serayuzgur/crates/issues/36)

## 0.3.5

- User-Agent header added on crates.io requests. [#31](https://github.com/serayuzgur/crates/issues/31)

## 0.3.4

- A bug which caused loop on parsing fixed. [#29](https://github.com/serayuzgur/crates/issues/29)
- Version confuse after inline table version fixed. [#30](https://github.com/serayuzgur/crates/issues/30)

## 0.3.3

- Confuse on table dependencies with boolean attributes fixed. [#28](https://github.com/serayuzgur/crates/issues/28)

## 0.3.2

- Spacing issues with inline dependencies. [#26](https://github.com/serayuzgur/crates/issues/26).
- New settings: crates.latestDecorator. For changing latest version decoration. [#27](https://github.com/serayuzgur/crates/issues/27)

## 0.3.1

- Dependencies updated.
- Command descriptions are better now.
- Emojis added for critical status messages.
- **Update All** command added.
- Some small performance improvements.
- Better README with more gifs :D
- New icon. (Wow, this really changes everything!)

## 0.3.0

- This is the most complete release so far.
- Retry command added for reloading versions.
- RegExps removed and migrated to a custom parser. [#17](https://github.com/serayuzgur/crates/issues/17)
- Additional depencency case added for the test. [#22](https://github.com/serayuzgur/crates/issues/22)
- All failed fetchs will be reported via status mesage and notification with a _retry_ command. [#23](https://github.com/serayuzgur/crates/issues/23)
- A bug at caching fixed.
- Thanks to [@userzimmermann](https://github.com/userzimmermann) for this release.

## 0.2.4

- Regexp bug fixed by [@userzimmermann](https://github.com/userzimmermann)

## 0.2.3

- Extension listener is back to onchange but with a dirty control. [#15](https://github.com/serayuzgur/crates/issues/15)
- Out of line dependencies supported. [#8](https://github.com/serayuzgur/crates/issues/8)
- No dependency case handled by [@userzimmermann](https://github.com/userzimmermann)

## 0.2.2

- "-" is the controlidentifier for pre-release check.
- crates now decorates the toml file on each save. Not on every change.
- Invalid toml files caused a glitch on version decorations. Now all will be cleared with a toolbar and error message. Also commented sections handled correctly. [#9](https://github.com/serayuzgur/crates/issues/9)

## 0.2.1

- Patreon link changed to a badge.
- Marketplace badges are linked to marketplace. [#13](https://github.com/serayuzgur/crates/issues/13).
- Package json improved.
- The up to date decorator (👍) is now customizable from setting crates.upToDateDecorator [#12](https://github.com/serayuzgur/crates/issues/12).
- Listing pre-releases is now customizable from setting crates.listPreReleases [#10](https://github.com/serayuzgur/crates/issues/10).

## 0.2.0

- Version resolution support improved [#6](https://github.com/serayuzgur/crates/issues/6).
- Yanked versions removed from the version list [#7](https://github.com/serayuzgur/crates/issues/7).

## 0.1.1

- build-dependencies support.
- dev-dependencies support.

## 0.1.0

- Dependencies updated.
- Readme Updated.
- Version updated due to increased stability.

## 0.0.12

- Version List error fixed [#4](https://github.com/serayuzgur/crates/issues/4).

## 0.0.11

- Null control fix for "target". Thanks to [braunse](https://github.com/braunse).

## 0.0.10

- Complex Cargo.toml error fixed. [#1](https://github.com/serayuzgur/crates/issues/1)
- Support for target dependencies. (not all usage cases)
- Re-decorates on edit. (It was on save before)

## 0.0.9

- Version list (hover) is clickable now. Easier to navigate between versions.

## 0.0.8

- Better activation event. Listens for "Cargo.toml" as a rool level file.
- Refreshes after each save.
- fetch caching for performance

## 0.0.7

- If latest version is same with the current, a nice 👍 for you. No more unnecessary info.
- Hover tooltip is more readable now.
- Better gif at readme

## 0.0.6

- Activates on rust or toml.
- Only listens for Cargo.toml file

## 0.0.5

- Last version bug fixed

## 0.0.4

- travis integration
- gif resized
- readme edited
- badges added for marketplace and travis.
- parsing fixed for

## 0.0.3

- Console errors fixed.

## 0.0.2

- Logo added

## 0.0.1

- The first release, an alpha.
