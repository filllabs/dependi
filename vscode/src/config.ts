import { ConfigurationChangeEvent, DecorationInstanceRenderOptions, workspace } from "vscode";
import { DecorationPosition } from "./ui/pref";

export const DEPENDI = "dependi.";
const WORKBENCH_ACTIONS = "workbench.action.";

export enum Configs {
  RUST_ENABLED = `rust.enabled`,
  RUST_INDEX_SERVER_URL = `rust.indexServerURL`,
  RUST_UNSTABLE_FILTER = `rust.unstableFilter`,
  RUST_IGNORE_LINE_PATTERN = `rust.ignoreLinePattern`,
  RUST_INFORM_PATCH_UPDATES = `rust.informPatchUpdates`,
  RUST_ENABLED_LOCK_FILE = `rust.lockFileEnabled`,

  NPM_ENABLED = `npm.enabled`,
  NPM_INDEX_SERVER_URL = `npm.indexServerURL`,
  NPM_UNSTABLE_FILTER = `npm.unstableFilter`,
  NPM_IGNORE_LINE_PATTERN = `npm.ignoreLinePattern`,
  NPM_INFORM_PATCH_UPDATES = `npm.informPatchUpdates`,
  NPM_ENABLED_LOCK_FILE = `npm.lockFileEnabled`,

  PHP_ENABLED = `php.enabled`,
  PHP_INDEX_SERVER_URL = `php.indexServerURL`,
  PHP_UNSTABLE_FILTER = `php.unstableFilter`,
  PHP_IGNORE_LINE_PATTERN = `php.ignoreLinePattern`,
  PHP_INFORM_PATCH_UPDATES = `php.informPatchUpdates`,
  PHP_ENABLED_LOCK_FILE = `php.lockFileEnabled`,

  GO_ENABLED = `go.enabled`,
  GO_INDEX_SERVER_URL = `go.indexServerURL`,
  GO_UNSTABLE_FILTER = `go.unstableFilter`,
  GO_IGNORE_LINE_PATTERN = `go.ignoreLinePattern`,
  GO_INFORM_PATCH_UPDATES = `go.informPatchUpdates`,

  PYTHON_ENABLED = `python.enabled`,
  PYTHON_INDEX_SERVER_URL = `python.indexServerURL`,
  PYTHON_UNSTABLE_FILTER = `python.unstableFilter`,
  PYTHON_IGNORE_LINE_PATTERN = `python.ignoreLinePattern`,
  PYTHON_INFORM_PATCH_UPDATES = `python.informPatchUpdates`,
  PYTHON_ENABLED_LOCK_FILE = `python.lockFileEnabled`,

  VULS_ENABLED = `vulnerability.enabled`,
  VULS_GHSA_ENABLED = `vulnerability.ghsa.enabled`,
  VULS_OSV_BATCH_URL = `vulnerability.osvQueryURL.batch`,
  VULS_OSV_URL = `vulnerability.osvQueryURL.single`,

  INDEX_SERVER_API_KEY = `apiKey`,
  INDEX_SERVER_URL = `apiURL`,


  DECORATOR_POSITION = `decoration.position`,

  ERROR_DECORATOR = `decoration.error.template`,
  ERROR_DECORATOR_CSS = `decoration.error.style`,
  INCOMPATIBLE_DECORATOR = `decoration.incompatible.template`,
  INCOMPATIBLE_DECORATOR_CSS = `decoration.incompatible.style`,
  PATCH_UPDATE_DECORATOR = `decoration.patchUpdate.template`,
  PATCH_UPDATE_DECORATOR_CSS = `decoration.patchUpdate.style`,
  COMPATIBLE_DECORATOR = `decoration.compatible.template`,
  COMPATIBLE_DECORATOR_CSS = `decoration.compatible.style`,
  VULNERABILITY_DECORATOR = `decoration.vulnerability.template`,

  //Commands
  REPLACE_VERSIONS = `${DEPENDI}commands.replaceVersion`,
  GENERATE_VULNERABILITY_REPORT = `${DEPENDI}commands.vulnerability.report`,
  GENERATE_VULNERABILITY_CURRENT_REPORT = `${DEPENDI}commands.vulnerability.currentReport`,
  // CREATE_CHANGELOG = `${DEPENDI}createChangelog`,
  UPDATE_ALL = `${DEPENDI}commands.updateAll`,
  RETRY = `${DEPENDI}commands.retry`,
  ENABLE_LOCK_FILE_PARSING = `${DEPENDI}commands.enableLockFileParsing`,
  DISABLE_LOCK_FILE_PARSING = `${DEPENDI}commands.disableLockFileParsing`,
  LOCK_FILE_PARSED = `${DEPENDI}commands.lockFileParsed`,


  //Storage
  DEVICE_ID = `${DEPENDI}deviceID`,
  SHOWN_VERSION = `${DEPENDI}shownVersion`,
}

export const Settings = {
  version: "0.0.1",
  rust: {
    enabled: true,
    index: "",
    unstableFilter: "exclude",
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true

  },
  npm: {
    enabled: true,
    index: "",
    unstableFilter: "exclude",
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true
  },
  php: {
    enabled: true,
    index: "",
    unstableFilter: "exclude",
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true
  },
  go: {
    enabled: true,
    index: "",
    unstableFilter: "exclude",
    ignoreLinePattern: "",
    informPatchUpdates: true
  },
  python: {
    enabled: true,
    index: "",
    unstableFilter: "exclude",
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true
  },
  vulnerability: {
    enabled: false,
    ghsa: false,
    osvBatch: "",
    osvSingle: ""
  },
  api: {
    key: "",
    url: "",
    proPanelURL: "https://www.dependi.io/pro",
    deviceID: ""

  },
  decorator: {
    position: "" as DecorationPosition,
    error: {
      template: "",
      css: {}
    },
    incompatible: {
      template: "",
      css: {}
    },
    patchUpdate: {
      template: "",
      css: {}
    },
    compatible: {
      template: "",
      css: {}
    },
    vulnerability: {
      template: ""
    }
  },

  load: function () {
    const config = workspace.getConfiguration("dependi");

    // fill in the settings
    this.rust.enabled = config.get<boolean>(Configs.RUST_ENABLED) ?? true;
    this.rust.index = config.get<string>(Configs.RUST_INDEX_SERVER_URL) || "https://index.crates.io";
    this.rust.unstableFilter = config.get<string>(Configs.RUST_UNSTABLE_FILTER) ?? "exclude";
    this.rust.ignoreLinePattern = config.get<string>(Configs.RUST_IGNORE_LINE_PATTERN) || "";
    this.rust.informPatchUpdates = config.get<boolean>(Configs.RUST_INFORM_PATCH_UPDATES) ?? false;
    this.rust.lockFileEnabled = config.get<boolean>(Configs.RUST_ENABLED_LOCK_FILE) ?? true;

    this.npm.enabled = config.get<boolean>(Configs.NPM_ENABLED) ?? true;
    this.npm.index = config.get<string>(Configs.NPM_INDEX_SERVER_URL) || "https://registry.npmjs.org";
    this.npm.unstableFilter = config.get<string>(Configs.NPM_UNSTABLE_FILTER) ?? "exclude";
    this.npm.ignoreLinePattern = config.get<string>(Configs.NPM_IGNORE_LINE_PATTERN) || "";
    this.npm.informPatchUpdates = config.get<boolean>(Configs.NPM_INFORM_PATCH_UPDATES) ?? false;
    this.npm.lockFileEnabled = config.get<boolean>(Configs.NPM_ENABLED_LOCK_FILE) ?? true;

    this.php.enabled = config.get<boolean>(Configs.PHP_ENABLED) ?? true;
    this.php.index = config.get<string>(Configs.PHP_INDEX_SERVER_URL) || "https://repo.packagist.org";
    this.php.unstableFilter = config.get<string>(Configs.PHP_UNSTABLE_FILTER) ?? "exclude";
    this.php.ignoreLinePattern = config.get<string>(Configs.PHP_IGNORE_LINE_PATTERN) || "";
    this.php.informPatchUpdates = config.get<boolean>(Configs.PHP_INFORM_PATCH_UPDATES) ?? false;
    this.php.lockFileEnabled = config.get<boolean>(Configs.PHP_ENABLED_LOCK_FILE) ?? true;

    this.go.enabled = config.get<boolean>(Configs.GO_ENABLED) ?? true;
    this.go.index = config.get<string>(Configs.GO_INDEX_SERVER_URL) || "https://proxy.golang.org";
    this.go.unstableFilter = config.get<string>(Configs.GO_UNSTABLE_FILTER) ?? "exclude";
    this.go.ignoreLinePattern = config.get<string>(Configs.GO_IGNORE_LINE_PATTERN) || "";
    this.go.informPatchUpdates = config.get<boolean>(Configs.GO_INFORM_PATCH_UPDATES) ?? false;

    this.python.enabled = config.get<boolean>(Configs.PYTHON_ENABLED) ?? true;
    this.python.index = config.get<string>(Configs.PYTHON_INDEX_SERVER_URL) || "https://pypi.org/pypi";
    this.python.unstableFilter = config.get<string>(Configs.PYTHON_UNSTABLE_FILTER) ?? "exclude";
    this.python.ignoreLinePattern = config.get<string>(Configs.PYTHON_IGNORE_LINE_PATTERN) || "";
    this.python.informPatchUpdates = config.get<boolean>(Configs.PYTHON_INFORM_PATCH_UPDATES) ?? false;
    this.python.lockFileEnabled = config.get<boolean>(Configs.PYTHON_ENABLED_LOCK_FILE) ?? true;

    this.vulnerability.enabled = config.get<boolean>(Configs.VULS_ENABLED) ?? true;
    this.vulnerability.ghsa = config.get<boolean>(Configs.VULS_GHSA_ENABLED) ?? false;
    this.vulnerability.osvBatch = config.get<string>(Configs.VULS_OSV_BATCH_URL) || "https://api.osv.dev/v1/querybatch";
    this.vulnerability.osvSingle = config.get<string>(Configs.VULS_OSV_URL) || "https://api.osv.dev/v1/query";

    this.api.key = config.get<string>(Configs.INDEX_SERVER_API_KEY) || "";
    this.api.url = config.get<string>(Configs.INDEX_SERVER_URL) || "https://index.dependi.io";




    this.decorator.position = config.get<DecorationPosition>(Configs.DECORATOR_POSITION) || "after";
    this.decorator.error.template = config.get<string>(Configs.ERROR_DECORATOR) || "❗️❗️❗️";
    this.decorator.error.css = config.get<DecorationInstanceRenderOptions>(Configs.ERROR_DECORATOR_CSS) || {};
    this.decorator.incompatible.template = config.get<string>(Configs.INCOMPATIBLE_DECORATOR) || "❌ ${version}";
    this.decorator.incompatible.css = config.get<DecorationInstanceRenderOptions>(Configs.INCOMPATIBLE_DECORATOR_CSS) || {};
    this.decorator.patchUpdate.template = config.get<string>(Configs.PATCH_UPDATE_DECORATOR) || "⚠️ ${version}";
    this.decorator.patchUpdate.css = config.get<DecorationInstanceRenderOptions>(Configs.PATCH_UPDATE_DECORATOR_CSS) || {};
    this.decorator.compatible.template = config.get<string>(Configs.COMPATIBLE_DECORATOR) || "✅";
    this.decorator.compatible.css = config.get<DecorationInstanceRenderOptions>(Configs.COMPATIBLE_DECORATOR_CSS) || {};
    this.decorator.vulnerability.template = config.get<string>(Configs.VULNERABILITY_DECORATOR) || "🚨 ${count}";
    console.debug("Settings loaded", this);
  },
  onChange: function (e: ConfigurationChangeEvent) {
    if (e.affectsConfiguration("dependi")) {
      //TODO: traverse all keys and update the settings if they are changed
      console.debug("Config changed");
      this.load();
      const x = Settings.npm.unstableFilter
    }
  }
};
