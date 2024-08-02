// This file is for fetching PHP package versions from packagist.org


import * as https from "https";
import { Settings } from "../../config";
import { DependencyInfo } from "../DepencencyInfo";
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";

export const versions = (name: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {

    const url = getURL(name);
    const options = getReqOptions(url);
    var req = https.get(options, function (res) {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      var info: DependencyInfo;
      const body = addResponseHandlers(name, res, req, reject);

      res.on('end', function () {
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
      });
    });
    req.end();
  });
};
function getURL(name: string) {
  return cleanURL(`${Settings.php.index}/p2/${name}.json`);
}

