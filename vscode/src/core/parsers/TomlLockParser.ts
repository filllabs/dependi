import { satisfies } from "semver";
import Item from "../Item";

export class State {
  lockedValue: string;
  dependency: string;
  constructor() {
    this.lockedValue = "";
    this.dependency = "";
  }
}

export class TomlLockFileParser {
  constructor() {}

  parse(fileContent: string, items: Item[]): Item[] {
    const doc = fileContent.split(/\r?\n/);
    const state = new State();
    for (let row = 0; row < doc.length; row++) {
      const line = doc[row].trim();
      if (this.isTableSection(line)) {
        state.dependency = "";
        state.lockedValue = "";
        continue;
      }
      if (line.startsWith("[")) {
        state.dependency = "";
        state.lockedValue = "";
        continue;
      }
      if (/^name\s*=/.test(line)) {
        state.dependency = this.getPackageName(line);
        continue;
      }
      if (
        /^version\s*=/.test(line) &&
        state.dependency &&
        isPackagePresent(items, state.dependency)
      ) {
        state.lockedValue = this.getParsedVersion(line);
        setLockValue(state, items);
      }
    }

    return items;
  }

  isTableSection(line: string): boolean {
    const trimmed = line.trim();
    return trimmed.startsWith("[[") && trimmed.endsWith("]]");
  }

  getPackageName(line: string): string {
    return clearText(extractTomlString(line));
  }

  getParsedVersion(line: string): string {
    return clearText(extractTomlString(line));
  }
}

function extractTomlString(line: string): string {
  const eqIndex = line.indexOf("=");
  return eqIndex === -1 ? line : line.substring(eqIndex + 1);
}

export function isPackagePresent(items: Item[], packageName: string): boolean {
  return items.some((item) => item.key === packageName);
}
export function clearText(text: string) {
  return text.replace(/[^a-zA-Z0-9-_.*+]/g, "").trim();
}

export function setLockValue(state: State, items: Item[]): void {
  let foundItem = items.find((item) => item.key === state.dependency);
  if (foundItem && shouldApplyLock(foundItem, state.lockedValue)) {
    foundItem.lockedAt = state.lockedValue;
  }
  state.lockedValue = "";
  state.dependency = "";
}

function shouldApplyLock(item: Item, lockedValue: string): boolean {
  if (!item.lockedAt) {
    return true;
  }
  if (!item.value) {
    return false;
  }
  try {
    const constraint = item.value.replace(/^==/, "=");
    return satisfies(lockedValue, constraint);
  } catch {
    return false;
  }
}
