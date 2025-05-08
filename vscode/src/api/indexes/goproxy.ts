import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from 'http';
import { makeRequest } from './request';

export const versions = (name: string) => { // name eg: github.com/gorilla/mux
  return new Promise<DependencyInfo>(function (resolve, reject) {

    const url = getURL(name);
    const options = getReqOptions(url);

    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info: DependencyInfo;
      res.on("end", () => {
        try {
          const rawVersions = body.toString().split("\n");
          if (rawVersions.length === 1 && rawVersions[0] === "") {
            return latestVersion(name).then(resolve).catch(reject);
          }
          const cleanedVersions = rawVersions
            .map((version) => version.trim())
            .filter((version) => /^[vV]?\d+(\.\d+)*$/.test(version));

          info = {
            name: name,
            versions: cleanedVersions,
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };

    makeRequest(options, handleResponse, reject);
  });
};

const latestVersion = (name: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    const url = getLatestVersionURL(name);
    const options = getReqOptions(url);
    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info: DependencyInfo;
      res.on("end", () => {
        try {
          const raw = body.toString();
          const json = JSON.parse(raw);
          if (json.Version === undefined) {
            return reject(
              new Error(`Invalid response from goproxy: ${raw} for ${url}`)
            );
          }
          info = {
            name: name,
            versions: [json.Version],
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};

function getURL(name: string) {
  const lower_name = name.toLowerCase();
  const url = `${Settings.go.index}/${lower_name}/@v/list`;
  return cleanURL(url);
}

function getLatestVersionURL(name: string): string {
  const lower_name = name.toLowerCase();
  const url = `${Settings.go.index}/${lower_name}/@latest`;
  return cleanURL(url);
}
