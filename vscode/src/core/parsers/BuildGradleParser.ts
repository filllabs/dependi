import { TextDocument, TextLine } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";
import { shouldIgnoreLine } from "./utils";
import { Settings } from "../../config";

const CONFIG_NAMES =
  "implementation|api|compile|compileOnly|runtimeOnly|testImplementation|testCompile|testRuntimeOnly|androidTestImplementation|androidTestCompile|annotationProcessor|kapt|debugImplementation|releaseImplementation|classpath";

const SHORT_COORD_REGEX = new RegExp(
  `(?:${CONFIG_NAMES}|platform)\\s*(?:\\(\\s*)?['"]([^:'"]+):([^:'"]+):([^'"]+)['"]`,
  "i"
);

const MAP_COORD_REGEX =
  /group\s*:\s*['"]([^'"]+)['"]\s*,\s*name\s*:\s*['"]([^'"]+)['"]\s*,\s*version\s*:\s*['"]([^'"]+)['"]/i;

export class BuildGradleParser implements Parser {
  parse(doc: TextDocument): Item[] {
    const items: Item[] = [];
    let inDependencies = false;
    let braceDepth = 0;

    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.gradle.ignoreLinePattern, ["//"])) {
        continue;
      }

      const trimmed = line.text.trim();
      if (/^dependencies\s*\{/.test(trimmed)) {
        inDependencies = true;
        braceDepth = countChar(trimmed, "{") - countChar(trimmed, "}");
        continue;
      }

      if (inDependencies) {
        braceDepth += countChar(trimmed, "{") - countChar(trimmed, "}");
        if (braceDepth <= 0) {
          inDependencies = false;
          continue;
        }

        const item = parseDependencyLine(line);
        if (item) {
          items.push(item);
        }
      }
    }

    return items;
  }
}

function parseDependencyLine(line: TextLine): Item | undefined {
  const text = line.text;
  if (
    text.includes("project(") ||
    text.includes("files(") ||
    text.includes("fileTree(") ||
    text.includes("libs.") ||
    /\$\{/.test(text)
  ) {
    return undefined;
  }

  let match = SHORT_COORD_REGEX.exec(text);
  if (match) {
    return createItem(match[1], match[2], match[3], match.index, line);
  }

  match = MAP_COORD_REGEX.exec(text);
  if (match) {
    const versionStart = text.indexOf(match[3], match.index);
    return createItem(match[1], match[2], match[3], versionStart, line);
  }

  return undefined;
}

function createItem(
  group: string,
  artifact: string,
  version: string,
  versionSearchFrom: number,
  line: TextLine
): Item | undefined {
  if (!version || version.includes("$") || !/\d/.test(version)) {
    return undefined;
  }

  const versionStart = line.text.indexOf(version, versionSearchFrom);
  if (versionStart === -1) {
    return undefined;
  }

  const item = new Item();
  item.copyFrom(
    `${group}:${artifact}`,
    version,
    versionStart,
    versionStart + version.length,
    line.lineNumber,
    line.range.end.character
  );
  item.createRange();
  item.createDecoRange();
  return item;
}

function countChar(text: string, ch: string): number {
  return text.split(ch).length - 1;
}
