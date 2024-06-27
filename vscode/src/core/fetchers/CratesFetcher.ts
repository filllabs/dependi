import Item from "../Item";
import Dependency from "../Dependency";
import { StatusBar } from "../../ui/status-bar";
import * as API from "../../api/index/sparse-index-server";
import compareVersions from "../../semver/compareVersions";
import { CrateMetadatas } from "../../api/crateMetadatas";
import { Fetcher } from "./fetcher";
import { queryMultiplePackageVulns } from "../../api/osv/vulnerability-service";

export class CratesFetcher extends Fetcher {
  async versions(dependencies: Item[]): Promise<Dependency[]> {
    let transformer = this.transformServerResponse(API.versions, this.URL);
    const responses = dependencies.map(transformer);
    return Promise.all(responses);
  }

  transformServerResponse(
    versions: (name: string, indexServerURL: string) => Promise<CrateMetadatas>,
    indexServerURL: string
  ): (i: Item) => Promise<Dependency> {
    const base = this;
    return function (item: Item): Promise<Dependency> {
      return versions(item.key, indexServerURL)
        .then((crate: any) => {
          const versions = crate.versions
            .reduce((result: any[], item: string) => {
              const isPreRelease = base.checkPreRelease(item);
              if (!isPreRelease) result.push(item);
              return result;
            }, [])
            .sort(compareVersions)
            .reverse();
          return {
            item,
            versions,
          };
        })
        .catch((error: Error) => {
          console.error(error);
          return {
            item,
            error: item.key + ": " + error,
          };
        });
    };
  }

  async vulns(dependencies: Dependency[]): Promise<Dependency[]> {
    // Set status bar fetching vulnerabilities
    StatusBar.setText("Loading", "👀 Fetching vulnerabilities");
    const packageVulns = await queryMultiplePackageVulns(
      dependencies,
      "crates.io"
    );
    return packageVulns;
  }

  checkPreRelease(version: string): boolean {
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
