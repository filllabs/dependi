import path from "path";
import { TextDocument } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";
import { BuildGradleParser } from "./BuildGradleParser";
import { GradleVersionCatalogParser } from "./GradleVersionCatalogParser";
import { GradleWrapperParser } from "./GradleWrapperParser";

export class GradleParser implements Parser {
  parse(doc: TextDocument): Item[] {
    const filename = path.basename(doc.fileName).toLowerCase();

    switch (filename) {
      case "build.gradle":
      case "build.gradle.kts":
        return new BuildGradleParser().parse(doc);
      case "libs.versions.toml":
        return new GradleVersionCatalogParser().parse(doc);
      case "gradle-wrapper.properties":
        return new GradleWrapperParser().parse(doc);
      default:
        return [];
    }
  }
}
