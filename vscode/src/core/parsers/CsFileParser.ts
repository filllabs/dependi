import { TextDocument } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";
import semverRegex from 'semver-regex';

export class CsFileParser implements Parser {
  parse(doc: TextDocument): Item[] {
    let items: Item[] = [];
    
    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
    
      if (line.isEmptyOrWhitespace) {
        continue;
      }

      const isShebang = line.text.startsWith("#!");
      if (isShebang) {
        continue;
      }

      const matches = /^#:package (.+)@(.+)/.exec(line.text);
      if (matches) {
        const packageName = matches[1];
        const packagePart = matches[2].trim();

        const packageVersion = packagePart.match(semverRegex())?.[0];
        if (!packageVersion) {
          continue;
        }

        const endOfPackageName = "#:package".length + packageName.length;
        const startOfVersion = line.text.indexOf(packageVersion, endOfPackageName);
        const endOfVersion = startOfVersion + packageVersion.length;

        const item = new Item();
        item.copyFrom(
          packageName,
          packageVersion,
          startOfVersion,
          endOfVersion,
          line.lineNumber,
          line.range.end.character
        );
        item.createRange();
        item.createDecoRange();
        items.push(item);
      }

      break;
    }

    return items;
  }
}