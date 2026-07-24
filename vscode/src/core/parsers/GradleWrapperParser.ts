import { TextDocument } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";

const GRADLE_DISTRIBUTION_REGEX =
  /distributionUrl\s*=\s*(?:https\\:|https:)\/\/services\.gradle\.org\/distributions\/gradle-([\d.]+(?:-[\w.-]+)?)-(?:bin|all)\.zip/;

export class GradleWrapperParser implements Parser {
  parse(doc: TextDocument): Item[] {
    const text = doc.getText();
    const match = GRADLE_DISTRIBUTION_REGEX.exec(text);
    if (!match) {
      return [];
    }

    const version = match[1];
    const pos = doc.positionAt(match.index + match[0].indexOf(version));
    const line = doc.lineAt(pos.line);

    const item = new Item();
    item.copyFrom(
      "gradle",
      version,
      pos.character,
      pos.character + version.length,
      line.lineNumber,
      line.range.end.character
    );
    item.source = "gradle-wrapper";
    item.createRange();
    item.createDecoRange();
    return [item];
  }
}
