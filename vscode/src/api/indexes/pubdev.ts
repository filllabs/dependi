import { Settings } from "../../config";
import { DependencyInfo } from "../DepencencyInfo";
import { getReqOptions } from "../utils";
import {
  addResponseHandlers,
  cleanURL,
  isStatusInvalid,
  ResponseError,
} from "./utils";
import { ClientRequest, IncomingMessage } from "http";
import { makeRequest } from "./request";

export const versions = (name: string) => {
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
          const response = JSON.parse(Buffer.concat(body).toString());
          const versions = response.versions;
          const filteredVersions = Object.keys(versions).map((i: any) => {
            return versions[i].version;
          });
          info = {
            name: name,
            versions: filteredVersions,
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
  return cleanURL(`${Settings.dart.index}/api/packages/${name}`);
}
