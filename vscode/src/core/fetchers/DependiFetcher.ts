import { Indexes, VersionsReq } from "../../api/indexes/dependi/indexes";
import { Settings, UnstableFilter } from "../../config";
import { Logger } from "../../extension";
import compareVersions from "../../semver/compareVersions";
import Dependency from "../Dependency";
import Item from "../Item";
import { CurrentLanguage, Language } from "../Language";
import { possibleLatestVersion, splitByComma } from "../parsers/PypiParser";
import { Fetcher } from "./fetcher";
import { isPythonPreRelease } from "./PypiFetcher";

export class DependiFetcher extends Fetcher {
  isPreRelease(version: string): boolean {
    if (CurrentLanguage === Language.Python) {
      return isPythonPreRelease(version);
    }
    return super.isPreRelease(version);
  }

  async versions(dependencies: Dependency[]): Promise<Dependency[]> {
    let unstableFilter = UnstableFilter.Exclude;
    switch (CurrentLanguage) {
      case Language.Python:
        unstableFilter = Settings.python.unstableFilter;
        break;
      case Language.JS:
        unstableFilter = Settings.npm.unstableFilter;
        break;
      case Language.Golang:
        unstableFilter = Settings.go.unstableFilter;
        break;
      case Language.PHP:
        unstableFilter = Settings.php.unstableFilter;
        break;
      case Language.Rust:
        unstableFilter = Settings.rust.unstableFilter;
        break;
      case Language.Dart:
        unstableFilter = Settings.dart.unstableFilter;
        break;
      case Language.CSharp:
        unstableFilter = Settings.csharp.unstableFilter;
        break;
      case Language.Elixir:
        unstableFilter = Settings.elixir.unstableFilter;
        break;
      case Language.Gradle:
        unstableFilter = Settings.gradle.unstableFilter;
        break;
      case Language.Terraform:
        unstableFilter = Settings.terraform.unstableFilter;
        break;
    }
    const req: VersionsReq = {
      Language: CurrentLanguage,
      Packages: dependencies.map((d) => d.item),
      Dependencies: dependencies,
      IgnoreUnstables: unstableFilter,
      VulnerabilityCheck: Settings.vulnerability.enabled,
      GhsaCheck: Settings.vulnerability.ghsa
    };


    if (Settings.api.deviceID === "") {
      console.error("DeviceID is empty");
      Logger.appendLine("DeviceID is empty");
    }

    const headers = {
      Authorization: Settings.api.key,
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json",
    };
    let versions = await Indexes.getVersions(req, { headers });

    // Retry packages that vanished after excluding unstables — they may only
    // publish pre-releases (Issue #282).
    if (unstableFilter === UnstableFilter.Exclude) {
      const missing = versions.filter(
        (d) => !d.error && (!d.versions || d.versions.length === 0)
      );
      if (missing.length > 0) {
        const retry = await Indexes.getVersions(
          {
            ...req,
            IgnoreUnstables: UnstableFilter.IncludeAlways,
            Packages: missing.map((d) => d.item),
            Dependencies: missing,
          },
          { headers }
        );
        const retryByKey = new Map(retry.map((d) => [d.item.key, d]));
        versions = versions.map((d) => retryByKey.get(d.item.key) ?? d);
      }
    }

    versions = versions.map((dep) => {
      if (dep.versions) {
        dep.versions = this.filterAndSortVersions(
          dep.versions,
          dep.item.value,
          unstableFilter
        );
        if (
          CurrentLanguage === Language.JS &&
          dep.item.latestVersion &&
          !dep.versions.includes(dep.item.latestVersion)
        ) {
          dep.versions = [dep.item.latestVersion, ...dep.versions]
            .sort(compareVersions)
            .reverse();
        }
      }
      return dep;
    });

    if (CurrentLanguage === Language.Python) {
      const mappedVersions = versions.map((v) => {
        return this.mapVersions(v);
      });
      versions = mappedVersions;
    }
    return Promise.all(versions);
  }

  async vulns(dependencies: Dependency[]): Promise<Dependency[]> {
    throw new Error("Method not implemented.");
  }

  mapVersions(dep: Dependency, item?: Item): Dependency {
    if (!dep.versions) {
      return dep;
    }
    const versions = dep
      .versions!.filter((i: string) => i !== "" && i !== undefined)
      .sort(compareVersions)
      .reverse();
    if (item) {
      if (!item.lockedAt) {
        const constrains = splitByComma(item.value ?? "");
        const currVersion = possibleLatestVersion(constrains, versions);
        item.value = currVersion ? currVersion : item.value;
      }
      return {
        item,
        versions,
      };
    }
    if (!dep.item.lockedAt) {
      const constrains = splitByComma(dep.item.value ?? "");
      const currVersion = possibleLatestVersion(constrains, versions);
      dep.item.value = currVersion ? currVersion : dep.item.value;
    }
    dep.versions = versions;
    return dep;
  }

  fetch(isLatest?: boolean): (d: Dependency) => Promise<Dependency> {
    throw new Error("Method not implemented.");
  }
}