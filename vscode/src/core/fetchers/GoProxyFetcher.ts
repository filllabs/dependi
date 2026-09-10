
import { isGoPrivateModule } from "../../api/indexes/goEnv";
import { versions } from "../../api/indexes/goproxy";
import { Settings } from "../../config";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class GoProxyFetcher extends Fetcher {

  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      // Private modules (GOPRIVATE / GONOPROXY) are not on the public proxy.
      if (isGoPrivateModule(dep.item.key)) {
        // Keep the declared version so the UI stays quiet instead of 404 errors.
        dep.versions = dep.item.value ? [dep.item.value] : [];
        return dep;
      }
      return versions(dep.item.key).then((mod) => {
        const versions = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.go.unstableFilter
        );
        dep.versions = versions;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}
