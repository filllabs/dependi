import { versions } from "../../api/indexes/nuget";
import { Settings } from "../../config";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class NuGetFetcher extends Fetcher {
  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return function (dep: Dependency): Promise<Dependency> {
      if (dep.versions && dep.versions.length > 0) {
        return Promise.resolve(dep);
      }
      return versions(dep.item.key)
        .then((nugetPackage) => {
          dep.versions = base.filterAndSortVersions(
            nugetPackage.versions,
            dep.item.value,
            Settings.csharp.unstableFilter
          );
          return dep;
        })
        .catch(fetcherCatch(dep));
    };
  }
}
