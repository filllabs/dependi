import { TextDocument, TextLine } from "vscode";
import Item from "../Item";
import { isQuote, shouldIgnoreLine } from "./utils";
import { Settings } from "../../config";

class State {
  inModule: boolean;
  inModuleBlock: boolean;
  currentModule: string;
  items: Item[];
  braceDepth: number;

  constructor() {
    this.inModule = false;
    this.inModuleBlock = false;
    this.currentModule = "";
    this.items = [] as Item[];
    this.braceDepth = 0;
  }
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
        state.inModule = true;
        state.inModuleBlock = true;
        state.currentModule = moduleMatch[1];
        state.braceDepth = 1;
        continue;
      }

      // Handle module block that starts without opening brace on same line
      const moduleMatchNoBrace = text.match(/^module\s+"([^"]+)"\s*$/);
      if (moduleMatchNoBrace) {
        state.inModule = true;
        state.currentModule = moduleMatchNoBrace[1];
        continue;
      }

      // Track braces when in module
      if (state.inModule) {
        // Check for opening brace if we haven't entered the block yet
        if (!state.inModuleBlock && text.includes("{")) {
          state.inModuleBlock = true;
          state.braceDepth = 1;
        }

        if (state.inModuleBlock) {
          // Count braces to track nesting
          state.braceDepth += (text.match(/{/g) || []).length;
          state.braceDepth -= (text.match(/}/g) || []).length;

          // Parse source and version lines
          if (text.includes("source")) {
            // source = "namespace/name/provider" or source = "..."
            const sourceMatch = text.match(/source\s*=\s*"([^"]+)"/);
            if (sourceMatch) {
              state.currentModule = sourceMatch[1];
            }
          }

          if (text.includes("version")) {
            // version = "1.0.0" or version = ">= 1.0.0"
            const item = this.parseVersionLine(line, state.currentModule);
            if (item) {
              state.items.push(item);
            }
          }

          // Exit module block when all braces are closed
          if (state.braceDepth <= 0) {
            state.inModule = false;
            state.inModuleBlock = false;
            state.currentModule = "";
          }
        }
      }
    }

    return state.items;
  }

  private parseVersionLine(line: TextLine, moduleName: string): Item | null {
    const text = line.text;
    const start = line.firstNonWhitespaceCharacterIndex;

    // Match: version = "1.0.0" or version = ">= 1.0.0"
    const versionMatch = text.match(/version\s*=\s*"([^"]+)"/);
    if (!versionMatch) {
      return null;
    }

    let version = versionMatch[1];
    const versionStart = text.indexOf('"', text.indexOf("version")) + 1;
    const versionEnd = versionStart + version.length;

    // Remove version constraint operators if present
    version = version.replace(/^[~><=\s]+/, "").trim();

    const item = new Item();
    item.copyFrom(
      moduleName,
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
