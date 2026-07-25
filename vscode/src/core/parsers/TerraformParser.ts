import { TextDocument, TextLine } from "vscode";
import Item from "../Item";
import { shouldIgnoreLine } from "./utils";
import { Settings } from "../../config";

class State {
  inModule: boolean;
  inModuleBlock: boolean;
  moduleSource: string;
  pendingVersionLine: TextLine | null;
  items: Item[];
  braceDepth: number;

  constructor() {
    this.inModule = false;
    this.inModuleBlock = false;
    this.moduleSource = "";
    this.pendingVersionLine = null;
    this.items = [] as Item[];
    this.braceDepth = 0;
  }
}

/** Registry modules use namespace/name/provider (exactly 3 path segments). */
export function isTerraformRegistryModule(source: string): boolean {
  if (!source || source.includes("://") || source.startsWith(".") || source.startsWith("/")) {
    return false;
  }
  if (source.startsWith("git::") || source.startsWith("hg::") || source.startsWith("s3::") || source.startsWith("gcs::")) {
    return false;
  }
  const parts = source.split("/");
  return parts.length === 3 && parts.every((part) => part.length > 0);
}

export class TerraformParser {
  parse(doc: TextDocument): Item[] {
    let state = new State();

    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.terraform.ignoreLinePattern, ["#", "//"])) {
        continue;
      }

      const text = line.text.trim();

      // Check for module block start
      const moduleMatch = text.match(/^module\s+"([^"]+)"\s*\{/);
      if (moduleMatch) {
        this.resetModuleState(state, true, 1);
        continue;
      }

      // Handle module block that starts without opening brace on same line
      const moduleMatchNoBrace = text.match(/^module\s+"([^"]+)"\s*$/);
      if (moduleMatchNoBrace) {
        this.resetModuleState(state, false, 0);
        continue;
      }

      // Track braces when in module
      if (state.inModule) {
        // Check for opening brace if we haven't entered the block yet
        if (!state.inModuleBlock && text.includes("{")) {
          state.inModuleBlock = true;
          // Count braces on this line only once (do not pre-set then re-count).
          state.braceDepth = 0;
        }

        if (state.inModuleBlock) {
          // Count braces to track nesting
          state.braceDepth += (text.match(/{/g) || []).length;
          state.braceDepth -= (text.match(/}/g) || []).length;

          if (text.includes("source")) {
            const sourceMatch = text.match(/source\s*=\s*"([^"]+)"/);
            if (sourceMatch) {
              state.moduleSource = sourceMatch[1];
              if (state.pendingVersionLine && isTerraformRegistryModule(state.moduleSource)) {
                const item = this.parseVersionLine(state.pendingVersionLine, state.moduleSource);
                if (item) {
                  state.items.push(item);
                }
                state.pendingVersionLine = null;
              }
            }
          }

          if (text.includes("version")) {
            if (isTerraformRegistryModule(state.moduleSource)) {
              const item = this.parseVersionLine(line, state.moduleSource);
              if (item) {
                state.items.push(item);
              }
            } else {
              // source may appear after version in the block
              state.pendingVersionLine = line;
            }
          }

          // Exit module block when all braces are closed
          if (state.braceDepth <= 0) {
            this.resetModuleState(state, false, 0);
            state.inModule = false;
          }
        }
      }
    }

    return state.items;
  }

  private resetModuleState(state: State, inModuleBlock: boolean, braceDepth: number) {
    state.inModule = true;
    state.inModuleBlock = inModuleBlock;
    state.moduleSource = "";
    state.pendingVersionLine = null;
    state.braceDepth = braceDepth;
  }

  private parseVersionLine(line: TextLine, moduleSource: string): Item | null {
    const text = line.text;

    // Match: version = "1.0.0" or version = ">= 1.0.0" / "~> 5.0"
    const versionMatch = text.match(/version\s*=\s*"([^"]+)"/);
    if (!versionMatch) {
      return null;
    }

    const rawVersion = versionMatch[1];
    const versionStart = text.indexOf('"', text.indexOf("version")) + 1;
    const versionEnd = versionStart + rawVersion.length;

    // Normalize for comparison while keeping decoration range over the full quoted value.
    const version = rawVersion.replace(/^[~><=\s]+/, "").trim();

    const item = new Item();
    item.copyFrom(
      moduleSource,
      version,
      versionStart,
      versionEnd,
      line.lineNumber,
      line.range.end.character
    );
    item.createRange();
    item.createDecoRange();
    return item;
  }
}
