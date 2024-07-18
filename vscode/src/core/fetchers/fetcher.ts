import { openSettingsDialog } from "../../ui/dialogs";
import Dependency from "../Dependency";
import Item from "../Item";

export abstract class Fetcher {
  URL: string = "";
  ignoreUnstable: boolean = true;
  abstract versions(dependencies: Item[]): Promise<Dependency[]>;
  abstract vulns(dependency: Dependency[]): Promise<Dependency[]>;
  abstract checkPreRelease(version: string): boolean;
  constructor(url: string, ignoreUnstable: string, urlKey: string) {

    if (!URL) {
      openSettingsDialog(urlKey, "Please set the URL for the fetcher");
      return;
    }
    // delete double slashes in the URL
    let clean_url = url.replace("///", "");
    // delete trailing slashes in the URL
    if (clean_url.endsWith("/")) {
      clean_url = clean_url.slice(0, -1);
    }
    this.URL = clean_url;
    this.ignoreUnstable = this.ignoreUnstable;
  }
}
