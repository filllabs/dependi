
import Item from "../Item";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";
import { StatusBar } from "../../ui/status-bar";
import * as API from "../../api/index/php-index-server";
import { CrateMetadatas } from "../../api/crateMetadatas";
import compareVersions from "../../semver/compareVersions";
import { queryMultiplePackageVulns } from "../../api/osv/vulnerability-service";

export class PhpFetcher extends Fetcher {


  async versions(dependencies: Item[]): Promise<Dependency[]> {
    const isFullFetch = dependencies[0].values.length > 0;
    let transformer = this.transformServerResponse(API.versions, this.URL, isFullFetch);
    const responses = dependencies.map(transformer);
    return Promise.all(responses);
  }


  transformServerResponse(versions: (name: string, indexServerURL: string) => Promise<CrateMetadatas>, indexServerURL: string, isLatest?: boolean): (i: Item) => Promise<Dependency> {
    return async function (item: Item): Promise<Dependency> {
      const checkVersion = isLatest ? versions(item.key, indexServerURL) : versions(item.key, indexServerURL);
      return checkVersion.then((mod: any) => {
        const versions = mod.versions.filter((i: string) => i !== "" && i !== undefined).sort(compareVersions).reverse();
        return {
          item,
          versions,
        };
      }).catch((error: Error) => {
        console.error(error);
        return {
          item,
          error: item.key + ": " + error,
        };
      });
    };
  };

  async vulns(dependencies: Dependency[]): Promise<Dependency[]> {
    // Set status bar fetching vulnerabilities
    StatusBar.setText("Loading", "👀 Fetching vulnerabilities");
    const packageVulns = await queryMultiplePackageVulns(dependencies, "npm");
    return packageVulns;
  }

  checkPreRelease(version: string): boolean {
    throw new Error("Method not implemented.");
  }

}
