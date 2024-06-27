import { TextDocument } from "vscode";
import Item from "../Item";

export interface Parser {
  parse(doc: TextDocument): Item[];
}