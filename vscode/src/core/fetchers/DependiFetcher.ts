import { Indexes, VersionsReq } from "../../api/index/dependi-index-server/indexes";
import { Settings } from "../../config";
import Dependency from "../Dependency";
import Item from "../Item";
import { CurrentLanguage, Language } from "../Language";
import { mapVersions } from "./PypiFetcher";
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
        return mapVersions(v);
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
}
