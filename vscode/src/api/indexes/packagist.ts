// This file is for fetching PHP package versions from packagist.org
import { Settings } from "../../config";
import { DependencyInfo } from "../DepencencyInfo";
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, isStatusRedirect, ResponseError } from "./utils";
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
      var info: DependencyInfo;
      const body = addResponseHandlers(name, res, req, reject);
      res.on("end", () => {
        const response = JSON.parse(Buffer.concat(body).toString());
        try {
          info = {
            name: name,
            versions: response.packages[name].map((version: any) => version.version.replace(/^v/, '')),
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      }
      );
    };

    makeRequest(options, handleResponse, reject);
  });
};
function getURL(name: string) {
  return cleanURL(`${Settings.php.index}/p2/${name}.json`);
}

