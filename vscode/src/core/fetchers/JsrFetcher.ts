
import { versions } from "../../api/indexes/jsr";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class JsrFetcher extends Fetcher {

  fetch(isLatest?: boolean): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      const checkVersion = versions(dep.item.key, dep.item.value);
      return checkVersion.then((mod) => {
        const versions = mod.versions
          .filter((i: string) => i !== "" && i !== undefined && !base.checkUnstables(Settings.npm.unstableFilter, i, dep.item.value!))
          .sort(compareVersions).reverse();
        dep.versions = versions;
        dep.item.latestVersion = mod.latestVersion;
        dep.item.value = dep.item.value === "latest" ? mod.latestVersion : dep.item.value;
        dep.error = mod.error;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}
