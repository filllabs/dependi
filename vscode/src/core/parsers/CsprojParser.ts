import { TextDocument } from "vscode";
import Item from "../Item";
import { XMLParser, X2jOptions } from "fast-xml-parser";
import compareVersions from "../../semver/compareVersions";
import { Parser } from "./parser";

const xmlParserOptions: X2jOptions = {
  ignoreAttributes: false,
  isArray: (tagName) => tagName === "Project" || tagName === "ItemGroup" || tagName === "PackageVersion" || tagName === "PackageReference"
};

export class CsprojParser implements Parser {
  parse(doc: TextDocument): Item[] {
    const parser = new XMLParser(xmlParserOptions);
    const xmlObject = parser.parse(doc.getText());

    const projects: any[] = xmlObject["Project"] ?? [];
    const itemGroups: any[] = projects.flatMap(p => p["ItemGroup"] ?? []);
    const packageVersions = itemGroups.flatMap(g => g["PackageVersion"] ?? []);
    const packageReferences = itemGroups.flatMap(g => g["PackageReference"] ?? []);

    const detectedPackages = 
      packageVersions.concat(packageReferences)
        .map(p => ({ name: p["@_Include"], version: p["@_Version"] }))
        .filter(p => !!p.version)
        .filter(p => compareVersions.validate(p.version));

    let items: Item[] = [];

    let state = resetState();

    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);

      if (line.text.includes("<PackageVersion") || line.text.includes("<PackageReference")) {
        // start read next package and search for name && version
        state = resetState();
      }
      if (line.text.includes("Include=")) {
        const matches = /Include="([a-zA-z0-9.]+)"/.exec(line.text);
        const packageName = matches && matches[1];
        state.name = packageName || state.name;
      }
      if (line.text.includes("Version=")) {
        const matches = /Version="([0-9.]+)"/.exec(line.text);
        const packageVersion = matches && matches[1];
        state.version = packageVersion || state.version;
      }

      if (state.name && state.version) {
        if (!detectedPackages.some(p => p.name === state.name && p.version === state.version)) {
          continue;
        }

        const startOfVersion = line.text.indexOf(state.version);
        const endOfVersion = startOfVersion + state.version.length;

        const item = new Item();
        item.copyFrom(
          state.name,
          state.version,
          startOfVersion,
          endOfVersion,
          line.lineNumber,
          line.range.end.character
        );
        items.push(item);

        state = resetState();
      }
    }

    return items;
  }
}

function resetState() {
  return {
    name: "",
    version: "",
  };
}