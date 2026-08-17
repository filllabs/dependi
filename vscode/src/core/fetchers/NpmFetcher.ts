
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
        let versions = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.npm.unstableFilter
        );
        // Respect npm dist-tags.latest even when it points at a pre-release
        // (e.g. markdown-exit's latest tag is 1.0.0-beta.*).
        if (mod.latestVersion && !versions.includes(mod.latestVersion)) {
          versions = [mod.latestVersion, ...versions]
            .sort(compareVersions)
            .reverse();
        }
        dep.versions = versions;
        dep.item.latestVersion = mod.latestVersion;
        dep.item.value = dep.item.value === "latest" ? mod.latestVersion : dep.item.value;
        dep.error = mod.error;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}