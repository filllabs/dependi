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
    this.URL = url;
    this.ignoreUnstable = this.ignoreUnstable;
  }
}
