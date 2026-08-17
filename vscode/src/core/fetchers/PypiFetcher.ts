import { DependencyInfo } from "../../api/DepencencyInfo";
import { versions } from "../../api/indexes/pypi";
import { Settings } from "../../config";
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

  isPreRelease(version: string): boolean {
    return isPythonPreRelease(version);
  }

  mapVersions(di: DependencyInfo, dep: Dependency): Dependency {
    const versions = this.filterAndSortVersions(
      di.versions!,
      dep.item.value,
      Settings.python.unstableFilter
    );
    if (!dep.item.lockedAt) {
      const constrains = splitByComma(dep.item.value ?? "");
      const currVersion = possibleLatestVersion(constrains, versions);
      dep.item.value = currVersion ? currVersion : dep.item.value;
    }
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

export function isPythonPreRelease(version: string): boolean {
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