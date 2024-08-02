import { versions } from "../../api/indexes/crates";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class CratesFetcher extends Fetcher {
  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return function (dep: Dependency): Promise<Dependency> {
      if (dep.versions && dep.versions.length > 0) {
        return Promise.resolve(dep);
      }
      return versions(dep.item.key)
        .then((crate) => {
          const versions = crate.versions
            .filter((i: string) => i !== "" && i !== undefined && !base.checkPreRelease(Settings.rust.ignoreUnstable, i))
            .sort(compareVersions)
            .reverse();

          dep.versions = versions;
          return dep;
        })
        .catch(fetcherCatch(dep));
    };
  }

}
