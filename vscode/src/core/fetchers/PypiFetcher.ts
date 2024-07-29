import { CrateMetadatas } from "../../api/crateMetadatas";
import * as API from "../../api/index/pypi-index-server";
import { queryMultiplePackageVulns } from "../../api/osv/vulnerability-service";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { StatusBar } from "../../ui/status-bar";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import Item from "../Item";
import { possibleLatestVersion, splitByComma } from "../parsers/PypiParser";
import { Fetcher } from "./fetcher";

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
    const base = this;
    return async function (item: Item): Promise<Dependency> {
      return versions(item.key, indexServerURL)
        .then((dep: any) => {
          return base.mapVersions(dep, item);
        })
        .catch(fetcherCatch(item));
    };
  }

  async vulns(dependencies: Dependency[]): Promise<Dependency[]> {
    // Set status bar fetching vulnerabilities
    StatusBar.setText("Loading", "👀 Fetching vulnerabilities");
    const packageVulns = await queryMultiplePackageVulns(dependencies, "PyPI");
    return packageVulns;
  }
  checkPreRelease(version: string): boolean {
    if (!Settings.python.ignoreUnstable) return false;
    // alpha and beta regexes for python
    const aORb = /\..*a|b.*/;
    return (
      version.indexOf(".alpha") !== -1 ||
      version.indexOf(".beta") !== -1 ||
      version.indexOf(".rc") !== -1 ||
      version.indexOf(".SNAPSHOT") !== -1 ||
      version.indexOf(".dev") !== -1 ||
      version.indexOf(".preview") !== -1 ||
      version.indexOf(".experimental") !== -1 ||
      version.indexOf(".canary") !== -1 ||
      version.indexOf(".pre") !== -1 ||
      aORb.test(version)


    );
  }
  mapVersions(dep: Dependency, item?: Item): Dependency {
    const versions = dep
      .versions!.filter((i: string) => i !== "" && i !== undefined && !this.checkPreRelease(i))
      .sort(compareVersions)
      .reverse();
    if (item) {
      const constrains = splitByComma(item.value ?? "");
      const currVersion = possibleLatestVersion(constrains, versions);
      item.value = currVersion ? currVersion : item.value;
      return {
        item,
        versions,
      };
    }
    const constrains = splitByComma(dep.item.value ?? "");
    const currVersion = possibleLatestVersion(constrains, versions);
    dep.item.value = currVersion ? currVersion : dep.item.value;
    dep.versions = versions;
    return dep;
  }
}

