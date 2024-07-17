import * as https from "https";
import NodeCache from "node-cache";
import { CrateMetadatas } from "../crateMetadatas";
import { getReqOptions } from "../utils";
import { Settings } from "../../config";
const cache = new NodeCache({ stdTTL: 60 * 10 });

export const versions = (
  name: string,
  indexServerURL: string,
  currentVersion?: string
) => {
  return new Promise<CrateMetadatas>(function (resolve, reject) {
    const cacheName = currentVersion ? name + "-latest" : name;
    const cached = cache.get<CrateMetadatas>(cacheName);
    if (cached) {
      resolve(cached);
      return;
    }
    const url = `${indexServerURL}/${currentVersion ? `/-/package/${name}/dist-tags` : `/${name}`}`;
    const options = getReqOptions(url);
    if (!currentVersion) {
      options.headers = {
        Accept: "application/vnd.npm.install-v1+json",
      };
    }
    var req = https.get(options, function (res) {
      // reject on bad status
      if (!res.statusCode) {
        reject(
          new Error(
            `statusCode=${res.statusCode}: ${options.hostname}${options.path}`
          )
        );
        return;
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(
          new Error(
            `statusCode=${res.statusCode}: ${options.hostname}${options.path}`
          )
        );
      }
      // cumulate data
      var crate_metadatas: CrateMetadatas;
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          let versions: string[] = [];
          versions = currentVersion
            ? setLatestVersion(response, currentVersion)
            : setVersions(response, versions);
          crate_metadatas = {
            name: name,
            versions: versions,
            features: [],
          };
          cache.set(cacheName, crate_metadatas);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
        resolve(crate_metadatas);
      });
    });
    // reject on request error
    req.on("error", function (err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    // IMPORTANT
    req.end();
  });
};

const setVersions = (response: any, versions: string[]) => {
  if (response.versions) {
    const versionData = Object.entries(response.versions);
    if (versionData.length) {
      versionData.forEach(([key, value]: [string, any]) => {
        if (
          !value.deprecated &&
          (!Settings.npm.ignoreUnstable || !key.includes("-"))
        ) {
          versions.push(key);
        }
      });
    }
  }
  return versions;
};

const setLatestVersion = (response: any, currentVersion: string) => {
  return currentVersion === response.latest
    ? [currentVersion]
    : [currentVersion, response.latest];
};
