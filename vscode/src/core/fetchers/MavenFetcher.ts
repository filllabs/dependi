import { versions as mavenVersions } from "../../api/indexes/maven";
import { gradleVersions } from "../../api/indexes/gradle";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";

export class MavenFetcher extends Fetcher {
  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return function (dep: Dependency): Promise<Dependency> {
      if (dep.versions && dep.versions.length > 0) {
        return Promise.resolve(dep);
      }

      const fetchPromise =
        dep.item.source === "gradle-wrapper" || dep.item.key === "gradle"
          ? gradleVersions()
          : dep.item.key.includes(":")
            ? mavenVersions(dep.item.key)
            : Promise.resolve({ name: dep.item.key, versions: [] as string[] });

      return fetchPromise
        .then((pkg) => {
          const versions = pkg.versions
            .filter(
              (version: string) =>
                version !== "" &&
                version !== undefined &&
                !base.checkUnstables(
                  Settings.gradle.unstableFilter,
                  version,
                  dep.item.value!
                )
            )
            .sort(compareVersions)
            .reverse();

          dep.versions = versions;
          return dep;
        })
        .catch(fetcherCatch(dep));
    };
  }
}
