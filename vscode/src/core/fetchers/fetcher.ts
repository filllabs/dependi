import { queryMultiplePackageVulns } from "../../api/osv/vulnerability-service";
import { UnstableFilter } from "../../config";
import { openSettingsDialog } from "../../ui/dialogs";
import { StatusBar } from "../../ui/status-bar";
import Dependency from "../Dependency";
import { CurrentEnvironment, CurrentLanguage } from "../Language";
import { DependencyCache } from "../listeners/listener";

export abstract class Fetcher {
  vulnsEnvironment: string = "";
  abstract fetch(isLatest?: boolean): (i: Dependency) => Promise<Dependency>;

  constructor(url: string, urlKey: string) {
    if (!url) {
      openSettingsDialog(urlKey, "Please set the URL for the fetcher");
      return;
    }
  }
  async vulns(dependencies: Dependency[]): Promise<Dependency[]> {
    // Set status bar fetching vulnerabilities
    StatusBar.setText("Loading", "👀 Fetching vulnerabilities");
    const missingVulns = dependencies.filter(
      (dep) => !dep.vulns || dep.vulns?.size === 0
    );
    const chunkedArrays = chunkDataArray(missingVulns, 500);
    const promises = chunkedArrays.map(async (chunk) => {
      return queryMultiplePackageVulns(chunk, CurrentEnvironment);
    });
    // Wait for all promises to resolve
    const chunkPromise = await Promise.all(promises);
    const resp = chunkPromise.reduce((acc, curr) => acc.concat(curr), []);

    // merge vulns with dependencies
    resp.forEach((dep) => {
      let cached = DependencyCache.get(CurrentLanguage)?.get<Dependency>(
        dep.item.key + dep.item.range.start.line
      );
      if (cached) {
        console.log("cached vulns", dep.item.key, dep.vulns);
        cached.vulns = dep.vulns;
      } else {
        console.log("new vulns", dep.item.key);
        DependencyCache.get(CurrentLanguage)?.set(dep.item.key + dep.item.range.start.line, dep);
      }
    });
    return resp;
  }

  async versions(dependencies: Dependency[]): Promise<Dependency[]> {
    const isFullFetch = dependencies.some(
      (dep) => dep.versions && dep.versions.length >= 0
    );
    let transformer = this.fetch(isFullFetch);
    const responses = dependencies.map((dep) => {
      // check if the dependency is already fetched from cache
      let resp = DependencyCache.get(CurrentLanguage)?.get<Dependency>(
        dep.item.key + dep.item.range.start.line
      );
      if (!resp || !resp.versions) {
        // if not found in cache, fetch from the source

        if (resp && resp.error) {
          console.log("cached", dep.item.key);
          return Promise.resolve(resp);
        }
        console.log("fetching", dep.item.key, resp?.error);

        return transformer(dep);
      }
      // if found in cache, return the cached version
      console.log("cached", dep.item.key);
      return Promise.resolve(resp);
    });
    return Promise.all(responses);
  }

  checkUnstables(unstableFilter: UnstableFilter, version: string, currentVersion: string): boolean {
    if (unstableFilter === UnstableFilter.IncludeAlways) return false;
    if (unstableFilter === UnstableFilter.IncludeIfUnstable && checkPreRelease(currentVersion)) return false;
    return checkPreRelease(version);
  }
}
function chunkDataArray(data: Dependency[], chunkSize: number) {
  const chunkedData = [];
  let currentChunk: Dependency[] = [];
  let currentChunkSize = 0;
  data.forEach((obj) => {
    const objSize = obj.versions?.length ?? 0;
    if (currentChunkSize + objSize <= chunkSize) {
      currentChunk.push(obj);
      currentChunkSize += objSize;
    } else {
      chunkedData.push(currentChunk);
      if (obj.versions && obj.versions.length > chunkSize) {
        obj.versions = obj.versions.slice(0, 1000);
      }
      currentChunk = [obj];
      currentChunkSize = objSize;
    }
  });
  if (currentChunk.length > 0) {
    chunkedData.push(currentChunk);
  }
  return chunkedData;
}

function checkPreRelease(version: string): boolean {
  version = version.toLowerCase();
  return (
    version.indexOf("-alpha") !== -1 ||
    version.indexOf("-beta") !== -1 ||
    version.indexOf("-rc") !== -1 ||
    version.indexOf("-snapshot") !== -1 ||
    version.indexOf("-dev") !== -1 ||
    version.indexOf("-preview") !== -1 ||
    version.indexOf("-experimental") !== -1 ||
    version.indexOf("-canary") !== -1 ||
    version.indexOf("-pre") !== -1 ||
    version.indexOf("-next") !== -1 ||
    version.indexOf("-nightly") !== -1 ||
    version.indexOf("-nullsafety") !== -1 ||
    version.indexOf("-nnbd") !== -1
  );
}