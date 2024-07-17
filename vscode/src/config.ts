import { ConfigurationChangeEvent, DecorationInstanceRenderOptions, workspace } from "vscode";
import { DecorationPosition } from "./ui/pref";

export const DEPENDI = "dependi.";
const WORKBENCH_ACTIONS = "workbench.action.";

export enum Configs {
  RUST_INDEX_SERVER_URL = `rust.indexServerURL`,
  RUST_IGNORE_UNSTABLES = `rust.excludeUnstableVersions`,

  NPM_INDEX_SERVER_URL = `npm.indexServerURL`,
  NPM_IGNORE_UNSTABLES = `npm.excludeUnstableVersions`,

  PHP_INDEX_SERVER_URL = `php.indexServerURL`,
  PHP_IGNORE_UNSTABLES = `php.excludeUnstableVersions`,

  GO_INDEX_SERVER_URL = `go.indexServerURL`,
  GO_IGNORE_UNSTABLES = `go.excludeUnstableVersions`,

  PYTHON_INDEX_SERVER_URL = `python.indexServerURL`,
  PYTHON_IGNORE_UNSTABLES = `python.excludeUnstableVersions`,

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
  COMPATIBLE_DECORATOR = `decoration.compatible.template`,
  COMPATIBLE_DECORATOR_CSS = `decoration.compatible.style`,
  VULNERABILITY_DECORATOR = `decoration.vulnerability.template`,

  //Commands
  REPLACE_VERSIONS = `${DEPENDI}commands.replaceVersion`,
  GENERATE_VULNERABILITY_REPORT = `${DEPENDI}commands.vulnerability.report`,
  // CREATE_CHANGELOG = `${DEPENDI}createChangelog`,
  UPDATE_ALL = `${DEPENDI}commands.updateAll`,
  RETRY = `${DEPENDI}commands.retry`,


  //Storage
  DEVICE_ID = `${DEPENDI}deviceID`,
  SHOWN_VERSION = `${DEPENDI}shownVersion`,
}

export const Settings = {
  version: "0.0.1",
  rust: {
    index: "",
    ignoreUnstable: false
  },
  npm: {
    index: "",
    ignoreUnstable: false
  },
  php: {
    index: "",
    ignoreUnstable: false
  },
  go: {
    index: "",
    ignoreUnstable: false
  },
  python: {
    index: "",
    ignoreUnstable: false
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
    this.rust.index = config.get<string>(Configs.RUST_INDEX_SERVER_URL) || "https://index.crates.io";
    this.rust.ignoreUnstable = config.get<boolean>(Configs.RUST_IGNORE_UNSTABLES) || true;

    this.npm.index = config.get<string>(Configs.NPM_INDEX_SERVER_URL) || "https://registry.npmjs.org";
    this.npm.ignoreUnstable = config.get<boolean>(Configs.NPM_IGNORE_UNSTABLES) || true;

    this.php.index = config.get<string>(Configs.PHP_INDEX_SERVER_URL) || "https://repo.packagist.org";
    this.php.ignoreUnstable = config.get<boolean>(Configs.PHP_IGNORE_UNSTABLES) || true;

    this.go.index = config.get<string>(Configs.GO_INDEX_SERVER_URL) || "https://proxy.golang.org";
    this.go.ignoreUnstable = config.get<boolean>(Configs.GO_IGNORE_UNSTABLES) || true;

    this.python.index = config.get<string>(Configs.PYTHON_INDEX_SERVER_URL) || "https://pypi.org/pypi";
    this.python.ignoreUnstable = config.get<boolean>(Configs.PYTHON_IGNORE_UNSTABLES) || true;

    this.vulnerability.enabled = config.get<boolean>(Configs.VULS_ENABLED) || false;
    this.vulnerability.ghsa = config.get<boolean>(Configs.VULS_GHSA_ENABLED) || false;
    this.vulnerability.osvBatch = config.get<string>(Configs.VULS_OSV_BATCH_URL) || "https://api.osv.dev/v1/querybatch";
    this.vulnerability.osvSingle = config.get<string>(Configs.VULS_OSV_URL) || "https://api.osv.dev/v1/query";

    this.api.key = config.get<string>(Configs.INDEX_SERVER_API_KEY) || "";
    this.api.url = config.get<string>(Configs.INDEX_SERVER_URL) || "https://index.dependi.io";




    this.decorator.position = config.get<DecorationPosition>(Configs.DECORATOR_POSITION) || "after";
    this.decorator.error.template = config.get<string>(Configs.ERROR_DECORATOR) || "❗️❗️❗️";
    this.decorator.error.css = config.get<DecorationInstanceRenderOptions>(Configs.ERROR_DECORATOR_CSS) || {};
    this.decorator.incompatible.template = config.get<string>(Configs.INCOMPATIBLE_DECORATOR) || "❌ ${version}";
    this.decorator.incompatible.css = config.get<DecorationInstanceRenderOptions>(Configs.INCOMPATIBLE_DECORATOR_CSS) || {};
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
    }
  }
};
