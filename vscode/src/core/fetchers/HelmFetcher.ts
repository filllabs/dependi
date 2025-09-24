import * as https from "https";
import { parse } from "yaml";
import Dependency from "../Dependency";
import { Fetcher } from "./fetcher";
import compareVersions from "../../semver/compareVersions";
import { Settings, UnstableFilter } from "../../config";

/**
 * HelmFetcher downloads index.yaml from each dependency's repository
 * and extracts available chart versions.
 */
export class HelmFetcher extends Fetcher {
  // repository index cache (in-memory, simple TTL)
  private static repoCache: Map<string, { ts: number; content: string }> =
    new Map();
  private ttlMs = 5 * 60 * 1000;

  constructor() {
    // pass non-empty dummy values to avoid settings dialog in Fetcher
    super("helm", "helm.index");
  }

  fetch(): (i: Dependency) => Promise<Dependency> {
    const base = this;
    return async function (dep: Dependency): Promise<Dependency> {
      console.log("Fetching versions for", dep.item.key);
      if (!dep.item.repository) {
        dep.error = "Missing repository";
        return dep;
      }
      try {
        const indexContent = await base.getIndexYaml(dep.item.repository);

        const versions = base
          .extractChartVersions(
            indexContent,
            dep.item.chartName || dep.item.key
          )
          .filter(
            (v) =>
              v &&
              !base.checkUnstables(
                Settings.helm.unstableFilter as UnstableFilter,
                v,
                dep.item.value || v
              )
          )
          .sort(compareVersions)
          .reverse();
        if (versions.length === 0) {
          dep.error = dep.error || "No versions found";
        } else {
          dep.versions = versions;
          dep.item.latestVersion = versions[0];
        }
      } catch (e: any) {
        dep.error = e?.message || "Failed to fetch index.yaml";
      }
      return dep;
    };
  }

  private async getIndexYaml(repo: string): Promise<string> {
    const url = repo + "/index.yaml";
    const cached = HelmFetcher.repoCache.get(url);
    const now = Date.now();
    if (cached && now - cached.ts < this.ttlMs) {
      return cached.content;
    }
    const content = await this.httpGet(url);
    HelmFetcher.repoCache.set(url, { ts: now, content });
    return content;
  }

  private httpGet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          if (
            !res.statusCode ||
            res.statusCode < 200 ||
            res.statusCode >= 300
          ) {
            reject(new Error(`HTTP ${res.statusCode} ${url}`));
            return;
          }
          let data = "";
          res.on("data", (c) => (data += c.toString("utf8")));
          res.on("end", () => resolve(data));
        })
        .on("error", reject);
    });
  }

  /**
   * Extract chart versions from index.yaml content.
   */
  private extractChartVersions(
    indexContent: string,
    chartName: string
  ): string[] {
    try {
      const data: any = parse(indexContent);
      if (!data) return [];
      // Standard Helm index: entries: { chartName: [ { version: "x" }, ... ] }
      const entryArray = data?.entries?.[chartName] || data?.[chartName]; // fallback if some index omits 'entries'
      if (!Array.isArray(entryArray)) return [];
      const versions = entryArray
        .map((o) => (o && typeof o === "object" ? o.version : undefined))
        .filter((v) => typeof v === "string" && v.length > 0);
      return Array.from(new Set(versions));
    } catch {
      return [];
    }
  }
}
