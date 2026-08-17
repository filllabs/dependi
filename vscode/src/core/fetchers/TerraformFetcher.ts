import { versions } from "../../api/indexes/terraform";
import { Settings } from "../../config";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class TerraformFetcher extends Fetcher {

  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      return versions(dep.item.key).then((mod) => {
        const versionList = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.terraform.unstableFilter
        );
        dep.versions = versionList;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}
