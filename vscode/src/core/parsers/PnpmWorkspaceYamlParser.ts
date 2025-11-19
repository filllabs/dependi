import { TextDocument, TextLine } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";
import { shouldIgnoreLine } from "./utils";

class State {
  inCatalogs: boolean;
  inCatalogBlock: boolean;
  currentCatalogName: string;
  items: Item[];
  catalogDepth: number;
  isSingleCatalog: boolean; // Track if using "catalog:" (single) vs "catalogs:" (multiple)
  
  constructor() {
    this.inCatalogs = false;
    this.inCatalogBlock = false;
    this.currentCatalogName = "";
    this.items = [] as Item[];
    this.catalogDepth = 0;
    this.isSingleCatalog = false;
  }
}

export class PnpmWorkspaceYamlParser implements Parser {
  parse(doc: TextDocument): Item[] {
    const state = new State();
    
    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      
      if (shouldIgnoreLine(line, "", ["#"])) {
        continue;
      }
      
      // Check if we're entering catalogs section
      if (isCatalogsStart(line)) {
        state.inCatalogs = true;
        state.catalogDepth = 0;
        state.isSingleCatalog = line.text.trim() === "catalog:";
        // If single catalog, we can parse dependencies immediately
        if (state.isSingleCatalog) {
          state.inCatalogBlock = true;
        }
        continue;
      }
      
      if (state.inCatalogs) {
        const indentLevel = getIndentLevel(line);
        
        // If we're back to root level (no indent), we've exited catalogs
        if (indentLevel === 0 && line.text.trim() !== "") {
          state.inCatalogs = false;
          state.inCatalogBlock = false;
          continue;
        }
        
        // For multiple catalogs, check if this is a catalog name (e.g., "default:", "react18:")
        if (!state.isSingleCatalog && isCatalogName(line)) {
          state.inCatalogBlock = true;
          state.currentCatalogName = getCatalogName(line);
          continue;
        }
        
        // If we're in a catalog block, parse dependencies
        if (state.inCatalogBlock) {
          const item = parseDependencyLine(line);
          if (item && item.key && item.value) {
            state.items.push(item);
          }
        }
      }
    }
    
    return state.items;
  }
}

function isCatalogsStart(line: TextLine): boolean {
  const text = line.text.trim();
  return text === "catalogs:" || text === "catalog:";
}

function isCatalogName(line: TextLine): boolean {
  // Catalog names are indented once and end with ":"
  const indentLevel = getIndentLevel(line);
  const text = line.text.trim();
  return indentLevel === 2 && text.endsWith(":") && !text.includes(" ");
}

function getCatalogName(line: TextLine): string {
  const text = line.text.trim();
  return text.slice(0, -1); // Remove the trailing ":"
}

function getIndentLevel(line: TextLine): number {
  return line.firstNonWhitespaceCharacterIndex;
}

function parseDependencyLine(line: TextLine): Item | null {
  const text = line.text.trim();
  
  // Skip empty lines and lines without ":"
  if (!text || !text.includes(":")) {
    return null;
  }
  
  const colonIndex = text.indexOf(":");
  const key = text.substring(0, colonIndex).trim().replace(/['"]/g, "");
  let value = text.substring(colonIndex + 1).trim().replace(/['"]/g, "");
  
  // Remove trailing comments
  if (value.includes("#")) {
    value = value.substring(0, value.indexOf("#")).trim();
  }
  
  if (!key || !value) {
    return null;
  }
  
  // Calculate positions in the original line
  const startOfValue = line.text.indexOf(value);
  const endOfValue = startOfValue + value.length;
  
  const item = new Item();
  item.copyFrom(
    key,
    value,
    startOfValue,
    endOfValue,
    line.lineNumber,
    line.range.end.character
  );
  item.createRange();
  item.createDecoRange();
  
  return item;
}
