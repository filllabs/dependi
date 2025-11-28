import { TextDocument } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";
import { CsprojParser } from "./CsprojParser";
import { CsFileParser } from "./CsFileParser";

export class CsParser implements Parser {
  csprojParser = new CsprojParser();
  csFileParser = new CsFileParser();

  parse(doc: TextDocument): Item[] {
    if (doc.fileName.endsWith(".cs")) {
      return this.csFileParser.parse(doc);
    }
    return this.csprojParser.parse(doc);
  }
}