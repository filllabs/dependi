import { TextDocument, TextLine } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";
import { clearText, isBoolean } from "./TomlParser";
import { shouldIgnoreLine, isQuote } from "./utils";
import { Settings } from "../../config";

export class GradleVersionCatalogParser implements Parser {
  parse(doc: TextDocument): Item[] {
    const items: Item[] = [];
    const versionRefs = new Map<string, string>();
    let section: "none" | "versions" | "libraries" = "none";

    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.gradle.ignoreLinePattern, ["#"])) {
        continue;
      }

      const trimmed = line.text.trim();
      if (trimmed.startsWith("[versions]")) {
        section = "versions";
        continue;
      }
      if (trimmed.startsWith("[libraries]")) {
        section = "libraries";
        continue;
      }
      if (trimmed.startsWith("[")) {
        section = "none";
        continue;
      }

      if (section === "versions") {
        const versionItem = parseVersionEntry(line);
        if (versionItem) {
          versionRefs.set(versionItem.key, versionItem.value!);
          items.push(versionItem);
        }
      } else if (section === "libraries") {
        const libraryItem = parseLibraryEntry(line, versionRefs);
        if (libraryItem) {
          items.push(libraryItem);
        }
      }
    }

    return items;
  }
}

function parseVersionEntry(line: TextLine): Item | undefined {
  const eqIndex = line.text.indexOf("=");
  if (eqIndex === -1) {
    return undefined;
  }

  const key = clearText(line.text.substring(0, eqIndex));
  const value = extractQuotedValue(line.text, eqIndex + 1);
  if (!key || !value || !/\d/.test(value)) {
    return undefined;
  }

  const versionStart = line.text.indexOf(value, eqIndex);
  const item = new Item();
  item.copyFrom(
    key,
    value,
    versionStart,
    versionStart + value.length,
    line.lineNumber,
    line.range.end.character
  );
  item.source = "version-catalog";
  item.createRange();
  item.createDecoRange();
  return item;
}

function parseLibraryEntry(
  line: TextLine,
  _versionRefs: Map<string, string>
): Item | undefined {
  const text = line.text;
  const groupMatch = /group\s*=\s*["']([^"']+)["']/.exec(text);
  const nameMatch = /name\s*=\s*["']([^"']+)["']/.exec(text);
  if (!groupMatch || !nameMatch) {
    return undefined;
  }

  const versionMatch = /version\s*=\s*["']([^"']+)["']/.exec(text);
  const versionRefMatch = /version\.ref\s*=\s*["']([^"']+)["']/.exec(text);

  if (versionRefMatch) {
    return undefined;
  }

  let version: string | undefined;
  let versionStart = -1;

  if (versionMatch) {
    version = versionMatch[1];
    versionStart = text.indexOf(version, versionMatch.index);
  } else {
    return undefined;
  }

  if (!version || !/\d/.test(version)) {
    return undefined;
  }

  const item = new Item();
  item.copyFrom(
    `${groupMatch[1]}:${nameMatch[1]}`,
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

function extractQuotedValue(line: string, start: number): string | undefined {
  let i = start;
  while (i < line.length && (line[i] === " " || line[i] === "\t")) {
    i++;
  }
  if (i >= line.length) {
    return undefined;
  }

  const quote = line[i];
  if (isQuote(quote)) {
    const end = line.indexOf(quote, i + 1);
    if (end === -1) {
      return undefined;
    }
    return line.substring(i + 1, end);
  }

  const commentIndex = line.indexOf("#", i);
  const end = commentIndex > -1 ? commentIndex : line.length;
  const value = line.substring(i, end).trim();
  return isBoolean(value) ? undefined : value.replace(/^"|"$/g, "");
}
