import * as https from "https";
import { Settings } from "../../config";
import { Logger } from "../../extension";
import { DependencyInfo } from "../DepencencyInfo";
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";

export const versions = (
  name: string,
  currentVersion?: string
) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    const url = getURL(currentVersion, name);
    const options = getReqOptions(url);
    if (!currentVersion) {
      options.headers = {
        Accept: "application/vnd.npm.install-v1+json",
      };
    }
    var req = https.get(options, function (res) {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      var info: DependencyInfo;
      let body = addResponseHandlers(name, res, req, reject);
      res.on("end", () => {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          let versions: string[] = [];
          versions = currentVersion
            ? setLatestVersion(response, currentVersion)
            : setVersions(response, versions);
          info = {
            name: name,
            versions: versions,
            latestVersion: currentVersion ? response.latest : response["dist-tags"].latest,
          };
        } catch (error) {
          console.error("Error parsing response:", error);
          Logger.appendLine("Error parsing response: " + error);
          reject(error);
        }
        resolve(info);
      });
    });

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
function getURL(currentVersion: string | undefined, name: string) {
  return cleanURL(`${Settings.npm.index}/${currentVersion ? `-/package/${name}/dist-tags` : `${name}`}`);
}

