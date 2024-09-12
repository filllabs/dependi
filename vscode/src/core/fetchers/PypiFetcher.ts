import { DependencyInfo } from "../../api/DepencencyInfo";
import { versions } from "../../api/indexes/pypi";
import { Settings, UnstableFilter } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { possibleLatestVersion, splitByComma } from "../parsers/PypiParser";
import { Fetcher } from "./fetcher";

export class PypiFetcher extends Fetcher {

  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      return versions(dep.item.key)
        .then((di) => {
          return base.mapVersions(di, dep);
        })
        .catch(fetcherCatch(dep));
    };
  }

  checkUnstables(unstableFilter: UnstableFilter, version: string, currentVersion: string): boolean {
    if (unstableFilter === UnstableFilter.IncludeAlways) return false;
    if (unstableFilter === UnstableFilter.IncludeIfUnstable && checkPreRelease(currentVersion)) return false;
    return checkPreRelease(version);
  }

  mapVersions(di: DependencyInfo, dep: Dependency): Dependency {
    const versions = di
      .versions!
      .filter((i: string) => i !== "" && i !== undefined && !this.checkUnstables(Settings.python.unstableFilter, i, dep.item.value!))
      .sort(compareVersions)
      .reverse();
    // if (dep) {
    const constrains = splitByComma(dep.item.value ?? "");
    const currVersion = possibleLatestVersion(constrains, versions);
    dep.item.value = currVersion ? currVersion : dep.item.value;
    dep.versions = versions;
    return dep;
    // }
    // const constrains = splitByComma(di.item.value ?? "");
    // const currVersion = possibleLatestVersion(constrains, versions);
    // di.item.value = currVersion ? currVersion : di.item.value;
    // di.versions = versions;
    // return di;
  }
}

function checkPreRelease(version: string): boolean {
  const aORb = /\..*a|b.*/;
  return (
    version.indexOf(".alpha") !== -1 ||
    version.indexOf(".beta") !== -1 ||
    version.indexOf(".rc") !== -1 ||
    version.indexOf(".SNAPSHOT") !== -1 ||
    version.indexOf(".dev") !== -1 ||
    version.indexOf(".preview") !== -1 ||
    version.indexOf(".experimental") !== -1 ||
    version.indexOf(".canary") !== -1 ||
    version.indexOf(".pre") !== -1 ||
    version.indexOf("rc") !== -1 ||
    aORb.test(version)
  );
}