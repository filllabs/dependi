import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from 'http';
import { makeRequest } from './request';

export const versions = (name: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    const url = getURL(name);
    const options = getReqOptions(url);
    const useSimpleIndex = isSimpleIndex(Settings.python.index);

    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info: DependencyInfo;
      res.on("end", () => {
        try {
          const raw = Buffer.concat(body).toString();
          if (useSimpleIndex) {
            info = {
              name: name,
              versions: parseSimpleIndexVersions(raw, name),
            };
          } else {
            const response = JSON.parse(raw);
            const filteredVersions = Object.keys(response.releases).filter(
              (version) => {
                const releaseInfo = response.releases[version];
                return releaseInfo.every(
                  (entry: { yanked: boolean }) => !entry.yanked
                );
              }
            );
            info = {
              name: name,
              versions: filteredVersions,
            };
          }
        } catch (e) {
          reject(e);
          return;
        }
        resolve(info);
      });
    };

    makeRequest(options, handleResponse, reject);
  });
};

/** PEP 503 simple indexes (e.g. Azure Artifacts `/pypi/simple`). */
export function isSimpleIndex(indexUrl: string): boolean {
  try {
    const pathname = new URL(indexUrl).pathname.replace(/\/+$/, "");
    return pathname === "simple" || pathname.endsWith("/simple");
  } catch {
    return /\/simple\/?$/i.test(indexUrl);
  }
}

/** PEP 503 package name normalization. */
export function normalizePackageName(name: string): string {
  return name.replace(/[-_.]+/g, "-").toLowerCase();
}

/**
 * Parse versions from a PEP 503 simple index HTML page.
 * Skips yanked files (`data-yanked`) and extracts versions from wheel/sdist filenames.
 */
export function parseSimpleIndexVersions(html: string, packageName: string): string[] {
  const versions = new Set<string>();
  const anchorRegex = /<a\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRegex.exec(html)) !== null) {
    if (/\bdata-yanked\b/i.test(match[0])) {
      continue;
    }
    const version = extractVersionFromHref(match[1], packageName);
    if (version) {
      versions.add(version);
    }
  }
  return Array.from(versions);
}

export function extractVersionFromHref(href: string, packageName: string): string | null {
  let filename = href.split("#")[0].split("?")[0];
  try {
    filename = decodeURIComponent(filename);
  } catch {
    // keep undecoded filename
  }
  filename = filename.substring(filename.lastIndexOf("/") + 1);
  if (!filename) {
    return null;
  }

  const normalizedPkg = normalizePackageName(packageName);

  if (/\.whl$/i.test(filename)) {
    const stem = filename.slice(0, -4);
    const parts = stem.split("-");
    if (parts.length < 5) {
      return null;
    }
    // Last 3 segments are python/abi/platform tags.
    const withoutTags = parts.slice(0, -3);
    for (let i = 1; i < withoutTags.length; i++) {
      const candidateName = normalizePackageName(withoutTags.slice(0, i).join("-"));
      if (candidateName === normalizedPkg) {
        let versionParts = withoutTags.slice(i);
        // Optional build tag starts with a digit (PEP 427).
        if (versionParts.length > 1 && /^\d/.test(versionParts[versionParts.length - 1])) {
          versionParts = versionParts.slice(0, -1);
        }
        return versionParts.length > 0 ? versionParts.join("-") : null;
      }
    }
    return null;
  }

  const sdistMatch = filename.match(/^(.+)\.(tar\.gz|tar\.bz2|tar\.xz|zip|tgz)$/i);
  if (!sdistMatch) {
    return null;
  }
  const stemParts = sdistMatch[1].split("-");
  for (let i = 1; i < stemParts.length; i++) {
    const candidateName = normalizePackageName(stemParts.slice(0, i).join("-"));
    if (candidateName === normalizedPkg) {
      const version = stemParts.slice(i).join("-");
      return version || null;
    }
  }
  return null;
}

function getURL(name: string) {
  if (isSimpleIndex(Settings.python.index)) {
    // Trailing slash avoids a common 307 from Azure / Artifactory simple indexes.
    const base = Settings.python.index.replace(/\/+$/, "");
    return `${base}/${normalizePackageName(name)}/`;
  }
  return cleanURL(`${Settings.python.index}/${name}/json`);
}
