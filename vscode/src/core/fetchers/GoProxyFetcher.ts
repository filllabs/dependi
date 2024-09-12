
import { versions } from "../../api/indexes/goproxy";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class GoProxyFetcher extends Fetcher {

  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      return versions(dep.item.key).then((mod) => {
        const versions = mod.versions
          .filter((i: string) => i !== "" && i !== undefined && !base.checkUnstables(Settings.go.unstableFilter, i, dep.item.value!))
          .sort(compareVersions).reverse();
        dep.versions = versions;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}