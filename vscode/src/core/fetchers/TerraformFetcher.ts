import { versions } from "../../api/indexes/terraform";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class TerraformFetcher extends Fetcher {

  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      return versions(dep.item.key).then((mod) => {
        const versionList = mod.versions
          .filter((i: string) => i !== "" && i !== undefined && !base.checkUnstables(Settings.terraform.unstableFilter, i, dep.item.value!))
          .sort(compareVersions).reverse();
        dep.versions = versionList;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  };
}
