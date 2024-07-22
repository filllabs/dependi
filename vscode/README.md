# Dependi: Your Ultimate Dependency Management Tool

Dependi is a comprehensive dependency management extension that helps developers write code faster and smarter by efficiently managing project dependencies. Formerly known as Crates the most loved and used dependency management extension for Rust. Dependi now supports multiple languages including Rust, Go, JavaScript, TypeScript, Python and PHP.

[Install](https://www.dependi.io/download) Dependi via VSCode or [Dependi.io](https://www.dependi.io)

When you install Dependi in Visual Studio Code, 2 options are available :

- Dependi Core: Provides essential dependency management for Rust, Go, JavaScript, TypeScript, Python and PHP projects. Free to use with no subscription required.

- [Dependi Pro:](https://www.dependi.io) Offers many advanced features like detailed vulnerability reports, private repository support, and priority support... Easy subscription packages and [free trials](https://www.dependi.io/#pricing) are available.

## Why Dependi?

Are you tired of manually managing your dependencies? Dependi is here to save the day! Whether you're a seasoned developer or just getting started, our extension is designed to make your life easier and your coding experience more enjoyable.

## Key Features

Dependi simplifies dependency management in Visual Studio Code, helping you to:

- **Manage Versions**: Dependi provides clear and concise views of all your project dependencies, making it easy to manage updates and versions.
  ![Manage Versions](https://www.dependi.io/screenshots/tooltip.png)

- **Related Links**: For more insights and resources related to the languages and tools Dependi supports, check out the following links:

  - **Rust**:
    - Documentation: [https://doc.rust-lang.org/](https://doc.rust-lang.org/)
    - Package Repository (crates.io): [https://crates.io/](https://crates.io/)
  - **Go**:
    - Documentation: [https://golang.org/doc/](https://golang.org/doc/)
    - Package Repository (pkg.go.dev): [https://pkg.go.dev/](https://pkg.go.dev/)
  - **JavaScript (NPM)**:
    - Documentation: [https://docs.npmjs.com/](https://docs.npmjs.com/)
    - Package Repository (npm): [https://www.npmjs.com/](https://www.npmjs.com/)
  - **Python**:
    - Documentation: [https://docs.python.org/3/](https://docs.python.org/3/)
    - Package Repository (PyPI): [https://pypi.org/](https://pypi.org/)
  - **PHP**:
    - Documentation: [https://www.php.net/docs.php](https://www.php.net/docs.php)
    - Package Repository (Packagist): [https://repo.packagist.org](https://repo.packagist.org)

- **Vulnerabilities at a Glance**: Quickly identify vulnerabilities in your project dependencies and take action to mitigate risks.
  ![Vulnerabilities at a Glance](https://www.dependi.io/screenshots/vuln.png)

- **Vulnerability Reports**: Generate comprehensive reports detailing the vulnerabilities in your dependencies, helping you maintain secure codebases.
  ![Vulnerability Reports](https://www.dependi.io/screenshots/report.png)

- **Supported Languages and Frameworks**: Dependi works with a variety of languages including Rust, Go, JavaScript, TypeScript, Python and PHP. It is designed to support most popular languages and frameworks, making it a versatile tool for developers.

For more information about the feature set [visit here](https://www.dependi.io/#features).

## Configuration Options

While Dependi works out-of-the-box without any configuration, we also offer a few customizable options:

### Index

- `dependi.apiURL`: The URL for the Dependi API server.
- `dependi.apiKey`: API key for accessing enhanced features.
- `dependi.rust.enabled`: Enable Rust package management.
- `dependi.rust.indexServerURL`: The URL for the Rust package index server.
- `dependi.rust.excludeUnstableVersions`: Exclude unstable versions from Rust package lists.
- `dependi.rust.ignoreLinePattern`: Matches lines according to the position of `*`. For example: `text*`, `*text`, `*text*`.
- `dependi.npm.enabled`: Enable NPM package management.
- `dependi.npm.indexServerURL`: The URL for the NPM package index server.
- `dependi.npm.excludeUnstableVersions`: Exclude unstable versions from NPM package lists.
- `dependi.npm.ignoreLinePattern`: Matches lines according to the position of `*`. For example: `text*`, `*text`, `*text*`.
- `dependi.go.enabled`: Enable Go package management.
- `dependi.go.indexServerURL`: The URL for the Go package index server.
- `dependi.go.excludeUnstableVersions`: Exclude unstable versions from Go package lists.
- `dependi.go.ignoreLinePattern`: Matches lines according to the position of `*`. For example: `text*`, `*text`, `*text*`.
- `dependi.python.enabled`: Enable Python package management.
- `dependi.python.indexServerURL`: The URL for the Python package index server.
- `dependi.python.excludeUnstableVersions`: Exclude unstable versions from Python package lists.
- `dependi.python.ignoreLinePattern`: Matches lines according to the position of `*`. For example: `text*`, `*text`, `*text*`.
- `dependi.php.enabled`: Enable PHP package management.
- `dependi.php.indexServerURL`: The URL for the PHP package index server.
- `dependi.php.excludeUnstableVersions`: Exclude unstable versions from PHP package lists.
- `dependi.php.ignoreLinePattern`: Matches lines according to the position of `*`. For example: `text*`, `*text`, `*text*`.
- `dependi.vulnerability.enabled`: Enable checking for vulnerabilities in dependencies.
- `dependi.vulnerability.ghsa.enabled`: Include GitHub Security Advisory vulnerabilities in checks.
- `dependi.vulnerability.osvQueryURL.batch`: The URL for batch querying vulnerabilities via OSV.
- `dependi.vulnerability.osvQueryURL.single`: The URL for querying single vulnerabilities via OSV.

### Decorations

- `dependi.decoration.position`: Position of UI decorations relative to package names.
- `dependi.decoration.compatible.template`: Decoration for compatible package versions.
- `dependi.decoration.compatible.style`: Style for compatible version decorations.
- `dependi.decoration.incompatible.template`: Decoration for incompatible package versions.
- `dependi.decoration.incompatible.style`: Style for incompatible version decorations.
- `dependi.decoration.error.template`: Decoration for error package versions.
- `dependi.decoration.error.style`: Style for error version decorations.
- `dependi.decoration.vulnerability.template`: Decoration for vulnerable package versions.

### Cargo.toml, go.mod, package.json and requirements.txt

- `# dependi: disable-check`: Disable version check for this specific dependency.

## Known Issues

Any minor issues or glitches you encounter will automatically be resolved when you save your work.

Help us simplify dependency management with Dependi, and let's make coding even more enjoyable! Together, we can achieve great things.
