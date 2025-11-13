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
    let packageName = "";
    let packageVersion = "";

    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);

      if (line.text.includes("<PackageVersion") || line.text.includes("<PackageReference")) {
        // start read next package and search for name && version
        packageName = "";
        packageVersion = "";
      }
      if (line.text.includes("Include=")) {
        const matches = /Include="([a-zA-z0-9.]+)"/.exec(line.text);
        packageName = (matches && matches[1]) || packageName;
      }
      if (line.text.includes("Version=")) {
        const matches = /Version="([0-9.]+)"/.exec(line.text);
        packageVersion = (matches && matches[1]) || packageVersion;
      }

      if (packageName && packageVersion) {
        if (!detectedPackages.some(p => p.name === packageName && p.version === packageVersion)) {
          continue;
        }

        // Find version position: search after "Version=" to avoid matching version in comments
        const versionAttrIndex = line.text.indexOf('Version="');
        const startOfVersion = versionAttrIndex !== -1 
          ? versionAttrIndex + 'Version="'.length 
          : line.text.indexOf(packageVersion);
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

        packageName = "";
        packageVersion = "";
      }
    }

    return items;
  }
}