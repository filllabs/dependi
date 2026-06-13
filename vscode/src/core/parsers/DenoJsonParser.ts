import { TextDocument } from "vscode";
import Item from "../Item";
import { JsonParser } from "./JsonParser";
import { convertAliasToPackageName } from "./PackageJsonParser";

export class DenoJsonParser extends JsonParser {
  constructor() {
    super(["imports", "scopes"], false, "", null);
  }

  parse(doc: TextDocument): Item[] {
    this.commentChars = doc.fileName.toLowerCase().endsWith(".jsonc")
      ? ["/"]
      : undefined;
    return super.parse(doc);
  }

  addDependency(item: Item) {
    const value = item.value?.trim();
    if (!value || value.startsWith("{")) {
      return;
    }

    if (
      item.key?.startsWith("http://") ||
      item.key?.startsWith("https://")
    ) {
      return;
    }

    const skipPrefixes = [
      "link:",
      "file:",
      "node:",
      "https:",
      "http:",
      "data:",
    ];
    if (skipPrefixes.some((prefix) => value.startsWith(prefix))) {
      return;
    }

    if (
      item.value?.startsWith("jsr:") ||
      item.value?.startsWith("npm:@jsr/")
    ) {
      item.source = "jsr";
    }

    convertAliasToPackageName(item);
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
}
