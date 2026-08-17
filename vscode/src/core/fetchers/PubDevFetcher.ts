
import { versions } from "../../api/indexes/pubdev";
import { Settings } from "../../config";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class PubDevFetcher extends Fetcher {

  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      return versions(dep.item.key).then((mod) => {
        const versions = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.dart.unstableFilter
        );
        dep.versions = versions;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}