import { Settings } from "../../config";
import * as vscode from "vscode";
import Item from "../Item";
import { JsonParser } from "./JsonParser";
import { PackageLockJsonParser } from "./PackageLockJsonParser";
import path, { dirname } from "path";
import * as fs from "fs";
import { clearText } from "./TomlParser";

export class NpmParser extends JsonParser {
  constructor() {
    super(
      [
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "optionalDependencies",
      ],
      Settings.npm.lockFileEnabled,
      "package-lock.json",
      new PackageLockJsonParser()
    );
  }

  addDependency(item: Item) {
    if (item.value?.startsWith("link:")) {
      return;
    }
    item = convertAliasToPackageName(item);
    item.createRange();
    item.createDecoRange();
    if (item.value?.startsWith("catalog:")) {
      if (this.state.yamlLines.length === 0) {
        const filePath = vscode.window.activeTextEditor?.document.fileName;
        const dirName = path.dirname(path.dirname(filePath || ""));
        try {
          const files = fs.readdirSync(dirName);
          const yamlFile = files.find((file) => file === "pnpm-workspace.yaml");
          if (yamlFile) {
            const yamlFilePath = path.join(dirName, yamlFile);
            const yamlContent = fs.readFileSync(yamlFilePath, "utf8");
            this.state.yamlLines = yamlContent.split("\n");
          }
        } catch (err) {
          console.error(err);
        }
      }
      if (this.state.yamlLines.length > 0) {
        const catalogName = item.value.replace("catalog:", "");
        const catalogLine = this.state.yamlLines.find((line) =>
          line.includes(catalogName)
        );
        if (catalogLine) {
          const catalogValue = clearText(catalogLine.split(":")[1].trim());
          item.value = catalogValue;
        }
      }
    }
    this.state.items.push(item);
  }
}

function convertAliasToPackageName(item: Item): Item {
  if (item.value?.startsWith("npm:")) {
    const atSymbolIndex = item.value.indexOf("@");
    if (atSymbolIndex !== -1) {
      item.key = item.value.slice(4, atSymbolIndex);
      item.value = item.value.slice(atSymbolIndex + 1);
      item.start = item.start + item.key.length + 5;
    }
  }
  return item;
}
