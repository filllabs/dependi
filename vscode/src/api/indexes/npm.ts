import { Settings, UnstableFilter } from "../../config";
import { Logger } from "../../extension";
import { DependencyInfo } from "../DepencencyInfo";
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from "http";
import { makeRequest } from "./request";

export const versions = (name: string, currentVersion?: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    const url = getURL(currentVersion, name);
    const options = getReqOptions(url);
    if (!currentVersion) {
      options.headers = {
        Accept: "application/vnd.npm.install-v1+json",
      };
    }

    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      var info: DependencyInfo;
      let body = addResponseHandlers(name, res, req, reject);
      res.on("end", () => {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          let versions: string[] = [];
          let err = "";
          ({ versions, err } = currentVersion
            ? setLatestVersion(response, currentVersion)
            : setVersions(response, versions));
          info = {
            name: name,
            versions: versions,
            latestVersion: currentVersion ? response.latest : response["dist-tags"].latest,
            error: err,
          };
        } catch (error) {
          console.error("Error parsing response:", error);
          Logger.appendLine("Error parsing response: " + error);
          reject(error);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject, !currentVersion ? "application/vnd.npm.install-v1+json": undefined);
  });
};

const setVersions = (response: any, versions: string[]) => {
  let err: string = "";
  if (response.versions) {
    const versionData = Object.entries(response.versions);
    if (versionData.length) {
      versionData.forEach(([key, value]: [string, any]) => {
        if (
          !value.deprecated &&
          (Settings.npm.unstableFilter !== UnstableFilter.Exclude || !key.includes("-"))
        ) {
          versions.push(key);
        } else if (value.deprecated) {
          err = value.deprecated;
        }
      });
    }
  }
  if (versions.length > 0) {
    err = "";
  }
  return { versions, err};
};

const setLatestVersion = (response: any, currentVersion: string) => {
  let versions: string[] = [];
  if (currentVersion === response.latest) {
    versions = [currentVersion];
  } else {
    versions = [currentVersion, response.latest];
  }

  return { versions, err: "" };
};
function getURL(currentVersion: string | undefined, name: string) {
  return cleanURL(`${Settings.npm.index}/${currentVersion ? `-/package/${name}/dist-tags` : `${name}`}`);
}
