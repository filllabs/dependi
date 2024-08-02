import * as https from 'https';
import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
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
      const body = addResponseHandlers(name, res, req, reject);
      let info: DependencyInfo;

      res.on('end', function () {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          const versions = Object.keys(response.releases);
          info = {
            name: name,
            versions: versions
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
  return cleanURL(`${Settings.python.index}/${name}/json`);
}

