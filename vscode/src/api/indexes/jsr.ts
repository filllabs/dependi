import { DependencyInfo } from "../DepencencyInfo";
import { getReqOptions } from "../utils";
import { addResponseHandlers, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from "http";
import { makeRequest } from "./request";
import { Settings } from "../../config";

export const versions = (name: string, currentVersion?: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    const url = getURL(name);
    const options = getReqOptions(url);
    options.headers = {
      ...options.headers,
      "Accept": "application/json",
    };

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
          if (response.versions) {
            versions = Object.keys(response.versions);
          }
          info = {
            name: name,
            versions: versions,
            latestVersion: response.latest,
            error: err,
          };
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};

function getURL(name: string) {
    // JSR package names are in the format @<scope>/<package>
    return `${Settings.npm.jsrIndex}/${name}/meta.json`;
}
