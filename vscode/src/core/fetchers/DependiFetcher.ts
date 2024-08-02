import { Indexes, VersionsReq } from "../../api/indexes/dependi/indexes";
import { Settings } from "../../config";
import { Logger } from "../../extension";
import compareVersions from "../../semver/compareVersions";
import Dependency from "../Dependency";
import Item from "../Item";
import { CurrentLanguage, Language } from "../Language";
import { possibleLatestVersion, splitByComma } from "../parsers/PypiParser";
import { Fetcher } from "./fetcher";


export class DependiFetcher extends Fetcher {

  async versions(dependencies: Dependency[]): Promise<Dependency[]> {
    let ignoreUnstable = false;
    switch (CurrentLanguage) {
      case Language.Python:
        ignoreUnstable = Settings.python.ignoreUnstable;
        break;
      case Language.JS:
        ignoreUnstable = Settings.npm.ignoreUnstable;
        break;
      case Language.Golang:
        ignoreUnstable = Settings.go.ignoreUnstable;
        break;
      case Language.PHP:
        ignoreUnstable = Settings.php.ignoreUnstable;
        break;
      case Language.Rust:
        ignoreUnstable = Settings.rust.ignoreUnstable;
        break;
    }
    const req: VersionsReq = {
      Language: CurrentLanguage,
      Packages: dependencies.map((d) => d.item.key),
      Dependencies: dependencies,
      IgnoreUnstables: ignoreUnstable,
      VulnerabilityCheck: Settings.vulnerability.enabled,
      GhsaCheck: Settings.vulnerability.ghsa
    };


    if (Settings.api.deviceID === "") {
      console.error("DeviceID is empty");
      Logger.appendLine("DeviceID is empty");
    }

    let versions = await Indexes.getVersions(req, {
      headers: {
        Authorization: Settings.api.key,
        "X-Device-ID": Settings.api.deviceID,
        "Content-Type": "application/json",
      },
    });
    if (CurrentLanguage === Language.Python) {
      const mappedVersions = versions.map((v) => {
        return this.mapVersions(v);
      });
      versions = mappedVersions;
    }
    return Promise.all(versions);
  }

  async vulns(dependencies: Dependency[]): Promise<Dependency[]> {
    throw new Error("Method not implemented.");
  }

  mapVersions(dep: Dependency, item?: Item): Dependency {
    const versions = dep
      .versions!.filter((i: string) => i !== "" && i !== undefined)
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

  fetch(isLatest?: boolean): (d: Dependency) => Promise<Dependency> {
    throw new Error("Method not implemented.");
  }
}
