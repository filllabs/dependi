
import { versions } from "../../api/indexes/npm";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class NpmFetcher extends Fetcher {

  fetch(isLatest?: boolean): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      const checkVersion = isLatest ? versions(dep.item.key, dep.item.value) : versions(dep.item.key);
      return checkVersion.then((mod) => {
        const versions = mod.versions
          .filter((i: string) => i !== "" && i !== undefined && !base.checkPreRelease(Settings.npm.ignoreUnstable, i))
          .sort(compareVersions).reverse();
        dep.versions = versions;
        dep.item.value = dep.item.value === "latest" ? mod.latestVersion : dep.item.value;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}