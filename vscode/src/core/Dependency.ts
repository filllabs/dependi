import { CompletionList } from "vscode";
import Item from "./Item";
import { VersionVulnerabilities } from "../api/osv/interfaces";

/**
 * Dependency is a data structure to define parsed dependency index, versions and error
 */
export default interface Dependency {
  item: Item;
  versions?: Array<string>;
  vulns?: Map<string, string[]>;
  error?: string;

  versionCompletionItems?: CompletionList;
  featureCompletionItems?: Map<string, CompletionList>;
}
