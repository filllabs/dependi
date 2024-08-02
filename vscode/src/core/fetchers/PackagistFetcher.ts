
import { versions } from "../../api/indexes/packagist";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";


export class PackagistFetcher extends Fetcher {
  fetch(isLatest?: boolean): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      const checkVersion = isLatest ? versions(dep.item.key) : versions(dep.item.key);
      return checkVersion.then((mod: any) => {
        const versions = mod.versions
          .filter((i: string) => i !== "" && i !== undefined && !base.checkPreRelease(Settings.php.ignoreUnstable, i))
          .sort(compareVersions)
          .reverse();
        dep.versions = versions;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };

}
