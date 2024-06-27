import Item from "../Item";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";
import { StatusBar } from "../../ui/status-bar";
import * as API from "../../api/index/pypi-index-server";
import { CrateMetadatas } from "../../api/crateMetadatas";
import compareVersions from "../../semver/compareVersions";
import { queryMultiplePackageVulns } from "../../api/osv/vulnerability-service";
import { possibleLatestVersion, splitByComma } from "../parsers/PypiParser";

export class PypiFetcher extends Fetcher {
  async versions(dependencies: Item[]): Promise<Dependency[]> {
    let transformer = this.transformServerResponse(API.versions, this.URL);
    const responses = dependencies.map(transformer);
    return Promise.all(responses);
  }

  transformServerResponse(
    versions: (name: string, indexServerURL: string) => Promise<CrateMetadatas>,
    indexServerURL: string
  ): (i: Item) => Promise<Dependency> {
    return async function (item: Item): Promise<Dependency> {
      return versions(item.key, indexServerURL)
        .then((dep: any) => {
          return mapVersions(dep, item);
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
    const packageVulns = await queryMultiplePackageVulns(dependencies, "PyPI");
    return packageVulns;
  }
  checkPreRelease(version: string): boolean {
    throw new Error("Method not implemented.");
  }
}

export function mapVersions(dep: Dependency, item?: Item): Dependency {
  const versions = dep
    .versions!.filter((i: string) => i !== "" && i !== undefined)
    .sort(compareVersions)
    .reverse();
  if (item) {
    const constrains = splitByComma(item.value ?? "");
    const currVersion = possibleLatestVersion(constrains, versions);
    item.value = currVersion ? currVersion : "";
    return {
      item,
      versions,
    };
  }
  const constrains = splitByComma(dep.item.value ?? "");
  const currVersion = possibleLatestVersion(constrains, versions);
  dep.item.value = currVersion ? currVersion : "";
  dep.versions = versions;
  return dep;
}
