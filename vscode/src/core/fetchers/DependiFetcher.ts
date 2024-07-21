import { Indexes, VersionsReq } from "../../api/index/dependi-index-server/indexes";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import Dependency from "../Dependency";
import Item from "../Item";
import { CurrentLanguage, Language } from "../Language";
import { possibleLatestVersion, splitByComma } from "../parsers/PypiParser";
import { Fetcher } from "./fetcher";


export class DependiFetcher extends Fetcher {
  async versions(dependencies: Item[]): Promise<Dependency[]> {

    const req: VersionsReq = {
      Language: CurrentLanguage,
      Packages: dependencies.map((d) => d.key),
      Dependencies: dependencies.map(
        (i) => ({ item: i, versions: [i.value] } as Dependency)
      ),
      IgnoreUnstables: this.ignoreUnstable,
      VulnerabilityCheck: Settings.vulnerability.enabled,
      GhsaCheck: Settings.vulnerability.ghsa
    };


    if (Settings.api.deviceID === "") {
      console.error("DeviceID is empty");
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
  checkPreRelease(version: string): boolean {
    throw new Error("Method not implemented.");
  }

  mapVersions(dep: Dependency, item?: Item): Dependency {
    const versions = dep
      .versions!.filter((i: string) => i !== "" && i !== undefined && !this.checkPreRelease(i))
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
}
