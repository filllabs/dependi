/**
 * Helm integration test harness (run outside VSCode UI).
 *
 * Usage (from vscode/ directory):
 *   1. Create a Chart.yaml (or use an existing one).
 *   2. Run:
 *        npm run test-helm
 *      (optionally pass a path: `CHART=../some/Chart.yaml npm run test-helm`)
 *
 * This script:
 *  - Mocks the 'vscode' module at runtime (so we can reuse existing parser/fetcher code).
 *  - Parses Chart.yaml dependencies via HelmChartParser.
 *  - Fetches available versions via HelmFetcher (downloads index.yaml from each repository).
 *  - Prints a small report including current & latest versions.
 */

// ------------------------------ VSCode Runtime Mock ------------------------------
/* eslint-disable @typescript-eslint/no-var-requires */
const Module = require("module");
const originalLoad = Module._load;
Module._load = function (request: string, parent: any, isMain: boolean) {
  // Skip loading unrelated fetchers to avoid circular or unnecessary dependency initialization in headless mode
  if (/CratesFetcher|NpmFetcher|GoProxyFetcher|PackagistFetcher|PypiFetcher|PubDevFetcher|DependiFetcher/.test(request)) {
    return {};
  }
  if (request === "vscode") {
    // Minimal Range mock used by Item
    class Range {
      start: { line: number; character: number };
      end: { line: number; character: number };
      constructor(sl: number, sc: number, el: number, ec: number) {
        this.start = { line: sl, character: sc };
        this.end = { line: el, character: ec };
      }
    }
    // Minimal StatusBarItem mock
    class StatusBarItemMock {
      text = "";
      tooltip: string | undefined;
      color: string | undefined;
      command: any;
      show() {}
      hide() {}
    }
    return {
      // Only what our code touches
      workspace: { getConfiguration: () => ({ get: () => undefined }) },
      env: { isTelemetryEnabled: false },
      commands: {
        executeCommand: () => Promise.resolve(),
        registerTextEditorCommand: () => ({ dispose() {} }),
        registerCommand: () => ({ dispose() {} })
      },
      window: {
        createStatusBarItem: () => new StatusBarItemMock(),
        setStatusBarMessage: () => ({ dispose() {} }),
        showErrorMessage: () => {}
      },
      StatusBarAlignment: { Left: 1, Right: 2 },
      Range,
      TextDocument: class {}
    };
  }
  return originalLoad(request, parent, isMain);
};

// ------------------------------ Imports (after mock) ------------------------------
import { readFileSync } from "fs";
import { existsSync } from "fs";
import { join, resolve } from "path";
import { HelmChartParser } from "../src/core/parsers/HelmChartParser";
import { HelmFetcher } from "../src/core/fetchers/HelmFetcher";
import Dependency from "../src/core/Dependency";
import Item from "../src/core/Item";

// We rely on default Settings object (do not call Settings.load() since it queries real VSCode config).

// ------------------------------ Minimal TextDocument Mock ------------------------------
interface TextLine {
  text: string;
  lineNumber: number;
  firstNonWhitespaceCharacterIndex: number;
  range: { end: { character: number } };
}
class MockTextDocument {
  private lines: string[];
  constructor(public content: string) {
    this.lines = content.split(/\r?\n/);
  }
  get lineCount() {
    return this.lines.length;
  }
  lineAt(i: number): TextLine {
    const text = this.lines[i];
    return {
      text,
      lineNumber: i,
      firstNonWhitespaceCharacterIndex: (text.match(/^(\s*)/)?.[1].length as number) || 0,
      range: { end: { character: text.length } }
    };
  }
  getText(): string {
    return this.content;
  }
}

// ------------------------------ Helpers ------------------------------
function pickChartPath(): string {
  // Priority order:
  // 1. CHART environment variable
  // 2. Local ./Chart.yaml

  if (process.env.CHART) {
    const abs = resolve(process.env.CHART);
    if (existsSync(abs)) return abs;
    throw new Error(`Provided chart path not found: ${abs}\nUsage examples:\n  CHART=/abs/path/Chart.yaml npm run test-helm`);
  }

  const local = join(process.cwd(), "Chart.yaml");
  if (existsSync(local)) return local;

  throw new Error("Chart.yaml not found.\nProvide a path via one of:\n  CHART=/abs/path/Chart.yaml npm run test-helm");
}

function printHeader(msg: string) {
  console.log("\n=== " + msg + " ===");
}

// ------------------------------ Main Flow ------------------------------
process.env.DEPENDI_HEADLESS = "1";

async function main() {
  const chartPath = pickChartPath();
  printHeader("Helm Test Harness");
  console.log("Chart file:", chartPath);

  const content = readFileSync(chartPath, "utf8");
  const doc = new MockTextDocument(content) as any;

  const parser = new HelmChartParser();
  const items: Item[] = parser.parse(doc);

  if (!items.length) {
    console.warn("No dependencies parsed from Chart.yaml");
    return;
  }

  printHeader("Parsed Dependencies");
  items.forEach((it) =>
    console.log({
      key: it.key,
      chartName: it.chartName,
      repository: it.repository,
      currentVersion: it.value,
      line: it.line
    })
  );

  const deps = items.map((i) => new Dependency(i));

  const fetcher = new HelmFetcher();
  const runner = fetcher.fetch();

  printHeader("Resolving Versions (index.yaml fetch)");
  for (const dep of deps) {
    await runner(dep);
    console.log({
      key: dep.item.key,
      current: dep.item.value,
      latest: dep.item.latestVersion,
      sampleVersions: dep.versions?.slice(0, 5),
      totalVersions: dep.versions?.length,
      error: dep.error
    });
  }

  printHeader("Summary");
  const updatable = deps.filter((d) => d.item.latestVersion && d.item.value && d.item.latestVersion !== d.item.value);
  console.log("Total deps:", deps.length);
  console.log("Updatable:", updatable.length);
  if (updatable.length) {
    console.log(
      "Updates:",
      updatable.map((d) => `${d.item.key}: ${d.item.value} -> ${d.item.latestVersion}`)
    );
  } else {
    console.log("All dependencies appear up-to-date or errors occurred.");
  }
}

main().catch((e) => {
  console.error("Harness failed:", e);
  process.exit(1);
});
