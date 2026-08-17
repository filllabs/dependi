
import { versions } from "../../api/indexes/jsr";
import { Settings } from "../../config";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class JsrFetcher extends Fetcher {

  fetch(isLatest?: boolean): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      const checkVersion = versions(dep.item.key, dep.item.value);
      return checkVersion.then((mod) => {
        const versions = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.npm.unstableFilter
        );
        dep.versions = versions;
        dep.item.latestVersion = mod.latestVersion;
        dep.item.value = dep.item.value === "latest" ? mod.latestVersion : dep.item.value;
        dep.error = mod.error;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}
