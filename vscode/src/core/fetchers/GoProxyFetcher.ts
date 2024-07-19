
import { CrateMetadatas } from "../../api/crateMetadatas";
import * as API from "../../api/index/go-proxy-server";
import { queryMultiplePackageVulns } from "../../api/osv/vulnerability-service";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { StatusBar } from "../../ui/status-bar";
import Dependency from "../Dependency";
import Item from "../Item";
import { Fetcher } from "./fetcher";

export class GoProxyFetcher extends Fetcher {

  async versions(dependencies: Item[]): Promise<Dependency[]> {
    let transformer = this.transformServerResponse(API.versions, this.URL);
    const responses = dependencies.map(transformer);
    return Promise.all(responses);
  }


  transformServerResponse(versions: (name: string, indexServerURL: string) => Promise<CrateMetadatas>, indexServerURL: string): (i: Item) => Promise<Dependency> {
    const base = this;
    return async function (item: Item): Promise<Dependency> {
      return versions(item.key, indexServerURL).then((mod: any) => {
        const versions = mod.versions.filter((i: string) => i !== "" && i !== undefined && !base.checkPreRelease(i)).sort(compareVersions).reverse();
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
    const packageVulns = await queryMultiplePackageVulns(dependencies, "Go");
    return packageVulns;
  }

  checkPreRelease(version: string): boolean {
    if (!Settings.go.ignoreUnstable) return false;
    return (
      version.indexOf("-alpha") !== -1 ||
      version.indexOf("-beta") !== -1 ||
      version.indexOf("-rc") !== -1 ||
      version.indexOf("-SNAPSHOT") !== -1 ||
      version.indexOf("-dev") !== -1 ||
      version.indexOf("-preview") !== -1 ||
      version.indexOf("-experimental") !== -1 ||
      version.indexOf("-canary") !== -1 ||
      version.indexOf("-pre") !== -1
    );
  }
}