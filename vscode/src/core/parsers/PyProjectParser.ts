import { Settings } from "../../config";
import Item from "../Item";
import { isQuote } from "./utils";
import { clearText, isBoolean, parsePackage, parseVersion, State, TomlParser } from "./TomlParser";

export class PyProjectParser extends TomlParser {
  constructor() {
    super(Settings.python.ignoreLinePattern, Settings.python.lockFileEnabled);
  }

  addItem(state: State, items: Item[]) {
    if (!state.currentItem.isValid()) {
      return;
    }
    const ingoreKey = ["python", "requires-python"];
    if (ingoreKey.includes(state.currentItem.key)) {
      return;
    }
    state.currentItem.createRange();
    state.currentItem.createDecoRange();
    items.push(state.currentItem);
    state.currentItem = new Item();
  }

  parsePair(line: string, row: number): Item | undefined {
    // Array values are handled via parseInlineDependencyArray / parseRequirementLine.
    if (/= \[/.test(line)) {
      return undefined;
    }
    const item = new Item();
    let eqIndex = line.indexOf("=");
    if (eqIndex === -1) {
      return undefined;
    }
    const braketIndex = line.substring(0, eqIndex).indexOf("[");
    row = eqIndex + 1;
    const commentIndex = line.indexOf("#");
    item.key = clearText(line.substring(0, braketIndex > -1 ? braketIndex : eqIndex));
    item.key = item.key.replace(".version", "");

    const valueItem = line.substring(eqIndex + 1, commentIndex > -1 ? commentIndex : line.length)
    const lastIndexOf = valueItem.indexOf(",");
    const rawValue = (lastIndexOf > -1 ? valueItem.substring(0, lastIndexOf) : valueItem).trim();
    // Keep PEP 440 / Poetry operators (==, ^, ~=, >=, ...) so exact pins stay exact.
    item.value = rawValue.replace(/^["']|["']$/g, "").trim();

    if (isBoolean(item.value) || item.value.includes("path") || /\bgit\s*=/.test(line)) {
      return undefined;
    }
    if (line.indexOf("{") > -1) {
      // json object
      parsePackage(line, item);
      parseVersion(line, item);
      return item.start > -1 ? item : undefined;
    }

    item.start = line.indexOf(item.value);
    item.end = item.start + item.value.length;

    if (line[eqIndex - 1] === "~" || line[eqIndex - 1] === ">") {
      let lastIndexOf = item.value.lastIndexOf(".");
      const lastString = item.value.substring(lastIndexOf + 1);
      if (isNaN(parseInt(lastString[0]))) {
        lastIndexOf = item.value.substring(0, lastIndexOf).lastIndexOf(".");
      }
      if (lastIndexOf > -1) {
        item.value = item.value.substring(0, lastIndexOf) + ".*";
      }
    }

    return item.start > -1 ? item : undefined;
  }

  isSubTable(line: string, state: State): boolean {
    if (line.trim() === "]") {
      state.isSubTable = false;
      state.isSingle = false;
      state.isMultipleDepTable = false;
      state.bypass = true;
      return false;
    }
    const trimmed = line.trimEnd();
    // Multi-line (`dependencies = [`) or inline (`dependencies = ["a"]`)
    if (!/= \[/.test(trimmed)) {
      return false;
    }
    // Bypassed sections (e.g. [tool.pytest]) must not treat arbitrary arrays as
    // dependency lists. Only PEP 621 `dependencies = [` may lift bypass.
    // Poetry/pixi `*dependencies]` tables and `[dependency-groups]` are already
    // marked as dependency tables, so they reach here with bypass=false.
    if (state.bypass) {
      const key = trimmed.substring(0, trimmed.indexOf("=")).trim();
      return key === "dependencies";
    }
    return true;
  }

  parseRequirementLine(
    line: string,
    row: number,
    endOfLine: number
  ): Item | undefined {
    return parsePep508Requirement(line, row, endOfLine);
  }

  parseInlineDependencyArray(
    line: string,
    row: number,
    endOfLine: number
  ): Item[] {
    const bracketStart = line.indexOf("[");
    const bracketEnd = line.lastIndexOf("]");
    if (bracketStart < 0 || bracketEnd <= bracketStart) {
      return [];
    }
    // Only treat as a closed inline array when `]` is on this line after content
    // (multi-line openers end with `[` and have no closing bracket yet).
    const afterEq = line.substring(line.indexOf("=") + 1).trim();
    if (!afterEq.startsWith("[") || !afterEq.includes("]")) {
      return [];
    }

    const items: Item[] = [];
    const body = line.substring(bracketStart + 1, bracketEnd);
    let i = 0;
    while (i < body.length) {
      while (i < body.length && (body[i] === "," || body[i] === " " || body[i] === "\t")) {
        i++;
      }
      if (i >= body.length) {
        break;
      }
      if (!isQuote(body[i])) {
        // Skip non-string entries
        while (i < body.length && body[i] !== ",") {
          i++;
        }
        continue;
      }
      const quote = body[i];
      const valueStart = bracketStart + 1 + i;
      i++;
      let valueEnd = i;
      while (valueEnd < body.length && body[valueEnd] !== quote) {
        valueEnd++;
      }
      const raw = body.substring(i, valueEnd);
      const absStart = valueStart;
      const absEnd = bracketStart + 1 + valueEnd + 1; // include closing quote
      const item = parsePep508Requirement(
        `"${raw}"`,
        row,
        endOfLine,
        absStart,
        absEnd
      );
      if (item) {
        items.push(item);
      }
      i = valueEnd + 1;
    }
    return items;
  }
}

/**
 * Parse a PEP 508 requirement string into an Item.
 * Accepts lines like: `"requests>=2.32.0",` or `requests[security]>=2.32.0`.
 */
function parsePep508Requirement(
  line: string,
  row: number,
  endOfLine: number,
  absoluteStart?: number,
  absoluteEnd?: number
): Item | undefined {
  const commentIndex = line.indexOf("#");
  let text = (commentIndex > -1 ? line.substring(0, commentIndex) : line).trim();
  if (!text || text === "]" || text === ",") {
    return undefined;
  }

  // Find quoted span if present
  let quoteStart = -1;
  let quoteEnd = -1;
  for (let i = 0; i < text.length; i++) {
    if (isQuote(text[i])) {
      if (quoteStart < 0) {
        quoteStart = i;
      } else {
        quoteEnd = i;
        break;
      }
    }
  }

  let req: string;
  let start: number;
  let end: number;

  if (quoteStart >= 0 && quoteEnd > quoteStart) {
    req = text.substring(quoteStart + 1, quoteEnd);
    start = absoluteStart ?? line.indexOf(text[quoteStart]);
    // Decoration should cover from version constraint start; fall back to full quote.
    end = absoluteEnd ?? start + (quoteEnd - quoteStart + 1);
  } else {
    // Unquoted requirement (rare in TOML arrays)
    req = text.replace(/,\s*$/, "").trim();
    if (!req) {
      return undefined;
    }
    start = absoluteStart ?? line.indexOf(req);
    end = absoluteEnd ?? start + req.length;
  }

  // Drop environment markers
  const markerIndex = req.indexOf(";");
  if (markerIndex > -1) {
    req = req.substring(0, markerIndex).trim();
  }

  // URL / path / git refs are not versioned PyPI packages
  if (
    req.includes("@") ||
    req.includes("://") ||
    req.startsWith(".") ||
    /\spath\s*=/.test(req)
  ) {
    return undefined;
  }

  const versionMatch = req.match(/[{[<>=!~]/);
  let name = versionMatch ? req.substring(0, versionMatch.index) : req;
  let version = versionMatch ? req.substring(versionMatch.index!) : "";

  // Strip extras: package[extra]
  const extrasIndex = name.indexOf("[");
  if (extrasIndex > -1) {
    name = name.substring(0, extrasIndex);
  }
  name = name.trim();
  version = version.trim();

  if (!name) {
    return undefined;
  }

  // Locals without a version constraint are not decoratable
  if (!version || !/\d/.test(version)) {
    return undefined;
  }

  // Point decoration range at the version constraint inside the quote when possible
  if (quoteStart >= 0 && versionMatch?.index !== undefined) {
    const versionOffsetInQuote = versionMatch.index;
    const versionStart =
      (absoluteStart ?? line.indexOf(text[quoteStart])) + 1 + versionOffsetInQuote;
    start = versionStart;
    end = versionStart + version.length;
  }

  const item = new Item();
  item.copyFrom(name, version, start, end, row, endOfLine);
  return item.isValid() ? item : undefined;
}
