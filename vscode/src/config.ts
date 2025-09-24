import { ConfigurationChangeEvent, DecorationInstanceRenderOptions, workspace } from "vscode";
import { DecorationPosition } from "./ui/pref";

export const DEPENDI = "dependi.";
const WORKBENCH_ACTIONS = "workbench.action.";

export enum UnstableFilter {
  Exclude,
  IncludeAlways,
  IncludeIfUnstable
}

export enum Configs {
  RUST_ENABLED = `rust.enabled`,
  RUST_INDEX_SERVER_URL = `rust.indexServerURL`,
  RUST_UNSTABLE_FILTER = `rust.unstableFilter`,
  RUST_IGNORE_LINE_PATTERN = `rust.ignoreLinePattern`,
  RUST_INFORM_PATCH_UPDATES = `rust.informPatchUpdates`,
  RUST_ENABLED_LOCK_FILE = `rust.lockFileEnabled`,
  RUST_SILENCE_VERSION_OVERFLOWS = `rust.silenceVersionOverflows`,

  NPM_ENABLED = `npm.enabled`,
  NPM_INDEX_SERVER_URL = `npm.indexServerURL`,
  NPM_UNSTABLE_FILTER = `npm.unstableFilter`,
  NPM_IGNORE_LINE_PATTERN = `npm.ignoreLinePattern`,
  NPM_INFORM_PATCH_UPDATES = `npm.informPatchUpdates`,
  NPM_ENABLED_LOCK_FILE = `npm.lockFileEnabled`,
  NPM_SILENCE_VERSION_OVERFLOWS = `npm.silenceVersionOverflows`,

  PHP_ENABLED = `php.enabled`,
  PHP_INDEX_SERVER_URL = `php.indexServerURL`,
  PHP_UNSTABLE_FILTER = `php.unstableFilter`,
  PHP_IGNORE_LINE_PATTERN = `php.ignoreLinePattern`,
  PHP_INFORM_PATCH_UPDATES = `php.informPatchUpdates`,
  PHP_ENABLED_LOCK_FILE = `php.lockFileEnabled`,
  PHP_SILENCE_VERSION_OVERFLOWS = `php.silenceVersionOverflows`,

  GO_ENABLED = `go.enabled`,
  GO_INDEX_SERVER_URL = `go.indexServerURL`,
  GO_UNSTABLE_FILTER = `go.unstableFilter`,
  GO_IGNORE_LINE_PATTERN = `go.ignoreLinePattern`,
  GO_INFORM_PATCH_UPDATES = `go.informPatchUpdates`,
  GO_SILENCE_VERSION_OVERFLOWS = `go.silenceVersionOverflows`,

  PYTHON_ENABLED = `python.enabled`,
  PYTHON_INDEX_SERVER_URL = `python.indexServerURL`,
  PYTHON_UNSTABLE_FILTER = `python.unstableFilter`,
  PYTHON_IGNORE_LINE_PATTERN = `python.ignoreLinePattern`,
  PYTHON_INFORM_PATCH_UPDATES = `python.informPatchUpdates`,
  PYTHON_ENABLED_LOCK_FILE = `python.lockFileEnabled`,
  PYTHON_SILENCE_VERSION_OVERFLOWS = `python.silenceVersionOverflows`,

  DART_ENABLED = `dart.enabled`,
  DART_INDEX_SERVER_URL = `dart.indexServerURL`,
  DART_UNSTABLE_FILTER = `dart.unstableFilter`,
  DART_IGNORE_LINE_PATTERN = `dart.ignoreLinePattern`,
  DART_INFORM_PATCH_UPDATES = `dart.informPatchUpdates`,
  DART_ENABLED_LOCK_FILE = `dart.lockFileEnabled`,
  DART_SILENCE_VERSION_OVERFLOWS = `dart.silenceVersionOverflows`,

  HELM_ENABLED = `helm.enabled`,
  HELM_UNSTABLE_FILTER = `helm.unstableFilter`,
  HELM_IGNORE_LINE_PATTERN = `helm.ignoreLinePattern`,
  HELM_INFORM_PATCH_UPDATES = `helm.informPatchUpdates`,
  HELM_SILENCE_VERSION_OVERFLOWS = `helm.silenceVersionOverflows`,

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

  // Extras
  SILENCE_UPDATE_MESSAGES = `extras.silenceUpdateMessages`,

  //Storage
  DEVICE_ID = `${DEPENDI}deviceID`,
  SHOWN_VERSION = `${DEPENDI}shownVersion`,

  // Old Settings
  RUST_UNSTABLE_OLD = `rust.excludeUnstableVersions`,
  NPM_UNSTABLE_OLD = `npm.excludeUnstableVersions`,
  PHP_UNSTABLE_OLD = `php.excludeUnstableVersions`,
  GO_UNSTABLE_OLD = `go.excludeUnstableVersions`,
  PYTHON_UNSTABLE_OLD = `python.excludeUnstableVersions`
}

export const Settings = {
  version: "0.0.1",
  rust: {
    enabled: true,
    index: "",
    unstableFilter: UnstableFilter.Exclude,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  npm: {
    enabled: true,
    index: "",
    unstableFilter: UnstableFilter.Exclude,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  php: {
    enabled: true,
    index: "",
    unstableFilter: UnstableFilter.Exclude,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  go: {
    enabled: true,
    index: "",
    unstableFilter: UnstableFilter.Exclude,
    ignoreLinePattern: "",
    informPatchUpdates: true,
    silenceVersionOverflows: false
  },
  python: {
    enabled: true,
    index: "",
    unstableFilter: UnstableFilter.Exclude,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  dart: {
    enabled: true,
    index: "",
    unstableFilter: UnstableFilter.Exclude,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  helm: {
    enabled: true,
    unstableFilter: UnstableFilter.Exclude,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    silenceVersionOverflows: false
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
  extras: {
    silenceUpdateMessages: false
  },

  load: function () {
    const config = workspace.getConfiguration("dependi");
    console.log(this.version);
    // fill in the settings
    this.rust.enabled = config.get<boolean>(Configs.RUST_ENABLED) ?? true;
    this.rust.index = config.get<string>(Configs.RUST_INDEX_SERVER_URL) || "https://index.crates.io";
    this.rust.unstableFilter = migrateUnstableSettings(Configs.RUST_UNSTABLE_FILTER, Configs.RUST_UNSTABLE_OLD);
    this.rust.ignoreLinePattern = config.get<string>(Configs.RUST_IGNORE_LINE_PATTERN) || "";
    this.rust.informPatchUpdates = config.get<boolean>(Configs.RUST_INFORM_PATCH_UPDATES) ?? false;
    this.rust.lockFileEnabled = config.get<boolean>(Configs.RUST_ENABLED_LOCK_FILE) ?? true;
    this.rust.silenceVersionOverflows = config.get<boolean>(Configs.RUST_SILENCE_VERSION_OVERFLOWS) ?? false;

    this.npm.enabled = config.get<boolean>(Configs.NPM_ENABLED) ?? true;
    this.npm.index = config.get<string>(Configs.NPM_INDEX_SERVER_URL) || "https://registry.npmjs.org";
    this.npm.unstableFilter = migrateUnstableSettings(Configs.NPM_UNSTABLE_FILTER, Configs.NPM_UNSTABLE_OLD);
    this.npm.ignoreLinePattern = config.get<string>(Configs.NPM_IGNORE_LINE_PATTERN) || "";
    this.npm.informPatchUpdates = config.get<boolean>(Configs.NPM_INFORM_PATCH_UPDATES) ?? false;
    this.npm.lockFileEnabled = config.get<boolean>(Configs.NPM_ENABLED_LOCK_FILE) ?? true;
    this.npm.silenceVersionOverflows = config.get<boolean>(Configs.NPM_SILENCE_VERSION_OVERFLOWS) ?? false;

    this.php.enabled = config.get<boolean>(Configs.PHP_ENABLED) ?? true;
    this.php.index = config.get<string>(Configs.PHP_INDEX_SERVER_URL) || "https://repo.packagist.org";
    this.php.unstableFilter = migrateUnstableSettings(Configs.PHP_UNSTABLE_FILTER, Configs.PHP_UNSTABLE_OLD);
    this.php.ignoreLinePattern = config.get<string>(Configs.PHP_IGNORE_LINE_PATTERN) || "";
    this.php.informPatchUpdates = config.get<boolean>(Configs.PHP_INFORM_PATCH_UPDATES) ?? false;
    this.php.lockFileEnabled = config.get<boolean>(Configs.PHP_ENABLED_LOCK_FILE) ?? true;
    this.php.silenceVersionOverflows = config.get<boolean>(Configs.PHP_SILENCE_VERSION_OVERFLOWS) ?? false;

    this.go.enabled = config.get<boolean>(Configs.GO_ENABLED) ?? true;
    this.go.index = config.get<string>(Configs.GO_INDEX_SERVER_URL) || "https://proxy.golang.org";
    this.go.unstableFilter = migrateUnstableSettings(Configs.GO_UNSTABLE_FILTER, Configs.GO_UNSTABLE_OLD);
    this.go.ignoreLinePattern = config.get<string>(Configs.GO_IGNORE_LINE_PATTERN) || "";
    this.go.informPatchUpdates = config.get<boolean>(Configs.GO_INFORM_PATCH_UPDATES) ?? false;
    this.go.silenceVersionOverflows = config.get<boolean>(Configs.GO_SILENCE_VERSION_OVERFLOWS) ?? false;

    this.python.enabled = config.get<boolean>(Configs.PYTHON_ENABLED) ?? true;
    this.python.index = config.get<string>(Configs.PYTHON_INDEX_SERVER_URL) || "https://pypi.org/pypi";
    this.python.unstableFilter = migrateUnstableSettings(Configs.PYTHON_UNSTABLE_FILTER, Configs.PYTHON_UNSTABLE_OLD);
    this.python.ignoreLinePattern = config.get<string>(Configs.PYTHON_IGNORE_LINE_PATTERN) || "";
    this.python.informPatchUpdates = config.get<boolean>(Configs.PYTHON_INFORM_PATCH_UPDATES) ?? false;
    this.python.lockFileEnabled = config.get<boolean>(Configs.PYTHON_ENABLED_LOCK_FILE) ?? true;
    this.python.silenceVersionOverflows = config.get<boolean>(Configs.PYTHON_SILENCE_VERSION_OVERFLOWS) ?? false;

    this.dart.enabled = config.get<boolean>(Configs.DART_ENABLED) ?? true;
    this.dart.index = config.get<string>(Configs.DART_INDEX_SERVER_URL) || "https://pub.dev";
    this.dart.unstableFilter = UnstableFilter[config.get<string>(Configs.DART_UNSTABLE_FILTER) as keyof typeof UnstableFilter] || UnstableFilter.Exclude;
    this.dart.ignoreLinePattern = config.get<string>(Configs.DART_IGNORE_LINE_PATTERN) || "";
    this.dart.informPatchUpdates = config.get<boolean>(Configs.DART_INFORM_PATCH_UPDATES) ?? false;
    this.dart.lockFileEnabled = config.get<boolean>(Configs.DART_ENABLED_LOCK_FILE) ?? true;
    this.dart.silenceVersionOverflows = config.get<boolean>(Configs.DART_SILENCE_VERSION_OVERFLOWS) ?? false;

    this.helm.enabled = config.get<boolean>(Configs.HELM_ENABLED) ?? true;
    this.helm.unstableFilter = migrateUnstableSettings(Configs.HELM_UNSTABLE_FILTER, Configs.HELM_UNSTABLE_FILTER);
    this.helm.ignoreLinePattern = config.get<string>(Configs.HELM_IGNORE_LINE_PATTERN) || "";
    this.helm.informPatchUpdates = config.get<boolean>(Configs.HELM_INFORM_PATCH_UPDATES) ?? false;
    this.helm.silenceVersionOverflows = config.get<boolean>(Configs.HELM_SILENCE_VERSION_OVERFLOWS) ?? false;

    this.vulnerability.enabled = config.get<boolean>(Configs.VULS_ENABLED) ?? true;
    this.vulnerability.ghsa = config.get<boolean>(Configs.VULS_GHSA_ENABLED) ?? false;
    this.vulnerability.osvBatch = config.get<string>(Configs.VULS_OSV_BATCH_URL) || "https://api.osv.dev/v1/querybatch";
    this.vulnerability.osvSingle = config.get<string>(Configs.VULS_OSV_URL) || "https://api.osv.dev/v1/query";

    this.api.key = config.get<string>(Configs.INDEX_SERVER_API_KEY) || "";
    this.api.url = config.get<string>(Configs.INDEX_SERVER_URL) || "https://index.dependi.io";

    this.decorator.position = config.get<DecorationPosition>(Configs.DECORATOR_POSITION) || "after";
    this.decorator.error.template = config.get<string>(Configs.ERROR_DECORATOR) ?? "❗️❗️❗️";
    this.decorator.error.css = config.get<DecorationInstanceRenderOptions>(Configs.ERROR_DECORATOR_CSS) || {};
    this.decorator.incompatible.template = config.get<string>(Configs.INCOMPATIBLE_DECORATOR) ?? "❌ ${version}";
    this.decorator.incompatible.css = config.get<DecorationInstanceRenderOptions>(Configs.INCOMPATIBLE_DECORATOR_CSS) || {};
    this.decorator.patchUpdate.template = config.get<string>(Configs.PATCH_UPDATE_DECORATOR) ?? "⚠️ ${version}";
    this.decorator.patchUpdate.css = config.get<DecorationInstanceRenderOptions>(Configs.PATCH_UPDATE_DECORATOR_CSS) || {};
    this.decorator.compatible.template = config.get<string>(Configs.COMPATIBLE_DECORATOR) ?? "✅";
    this.decorator.compatible.css = config.get<DecorationInstanceRenderOptions>(Configs.COMPATIBLE_DECORATOR_CSS) || {};
    this.decorator.vulnerability.template = config.get<string>(Configs.VULNERABILITY_DECORATOR) ?? "🚨 ${count}";

    this.extras.silenceUpdateMessages = config.get<boolean>(Configs.SILENCE_UPDATE_MESSAGES) ?? false;
    console.debug("Settings loaded", this);
  },
  onChange: function (e: ConfigurationChangeEvent) {
    if (e.affectsConfiguration("dependi")) {
      //TODO: traverse all keys and update the settings if they are changed
      console.debug("Config changed");
      this.load();
    }
  }
};

function migrateUnstableSettings(newSettingKey: string, oldSettingKey: string): UnstableFilter {
  const config = workspace.getConfiguration("dependi");
  const filter = config.get<string>(newSettingKey);
  if (Settings.version > "0.7.9") {
    const oldSetting = config.get<boolean>(oldSettingKey);
    if (oldSetting !== undefined) {
      config.update(oldSettingKey, undefined, true);
      config.update(newSettingKey, oldSetting ? "Exclude" : "IncludeAlways", true);
      return oldSetting ? UnstableFilter.Exclude : UnstableFilter.IncludeAlways;
    }
  }
  return UnstableFilter[filter as keyof typeof UnstableFilter] || UnstableFilter.Exclude;
}
