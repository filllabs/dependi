import { versions } from "../../api/indexes/crates";
import { Settings } from "../../config";
import compareVersions from "../../semver/compareVersions";
import { fetcherCatch } from "../../utils/errors";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";
import { AlternateRegistry } from "../AlternateRegistry";
import { DependencyCache } from "../listeners/listener";
import { CurrentLanguage } from "../Language";

export class CratesFetcher extends Fetcher {
  fetch(): (i: Dependency) => Promise<Dependency> {
      // Default fetch implementation used by base class if needed, but we override versions() usually.
      return this.fetchWithRegistries([]); 
  }

  fetchWithRegistries(alternateRegistries: AlternateRegistry[]): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return function (dep: Dependency): Promise<Dependency> {
      const alternateRegistry = alternateRegistries.find((registry) => dep.item.registry == registry.name);
      const thisCrateRegistry = dep.item.registry !== undefined ? alternateRegistry?.index : Settings.rust.index;
      const thisCrateToken = dep.item.registry !== undefined ? alternateRegistry?.token : undefined;

      // If it's a custom registry but we don't have an index URL, we skip it.
      if (dep.item.registry && dep.item.registry !== "crates-io" && !alternateRegistry?.index) {
          return Promise.resolve(dep);
      }
      
      if (dep.versions && dep.versions.length > 0) {
        return Promise.resolve(dep);
      }
      return versions(dep.item.key, thisCrateRegistry, thisCrateToken)
        .then((crate) => {
          const versions = crate.versions
            .filter((i: string) => i !== "" && i !== undefined && !base.checkUnstables(Settings.rust.unstableFilter, i, dep.item.value!))
            .sort(compareVersions)
            .reverse();

          dep.versions = versions;
          return dep;
        })
        .catch(fetcherCatch(dep));
    };
  }
  
  async versions(dependencies: Dependency[]): Promise<Dependency[]> {
      return super.versions(dependencies);
  }

  async fetchVersionsWithRegistries(dependencies: Dependency[], alternateRegistries: AlternateRegistry[]): Promise<Dependency[]> {
    const transformer = this.fetchWithRegistries(alternateRegistries);
    const responses = dependencies.map((dep) => {
      // check if the dependency is already fetched from cache
      let resp = DependencyCache.get(CurrentLanguage)?.get<Dependency>(
        dep.item.key + dep.item.range.start.line
      );
      if (!resp || !resp.versions) {
        if (resp && resp.error) {
          return Promise.resolve(resp);
        }
        return transformer(dep);
      }
      return Promise.resolve(resp);
    });
    return Promise.all(responses);
  }

}
