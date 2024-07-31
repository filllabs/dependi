import * as https from 'https';
import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";

export const versions = (name: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    // compute sparse index prefix
    const url = getURL(name);
    const options = getReqOptions(url);

    var req = https.get(options, function (res) {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      let body = addResponseHandlers(name, res, req, reject);
      let info: DependencyInfo;
      res.on('end', function () {
        try {
          const bodyString = Buffer.concat(body).toString();
          const bodyArray = bodyString.split('\n').filter(n => n).map(line => JSON.parse(line));
          info = {
            name: name,
            versions: bodyArray.filter((e: any) => e.yanked === false).map((e: any) => e.vers),
            features: Object.keys(bodyArray.at(-1).features).filter(feature => feature !== "default")
          };
        } catch (e) {
          return reject(e);
        }
        resolve(info);
      });
    });

    req.end();
  });
};

/**
 * Generates a URL for a given crate name based on its length and structure.
 *
 * @param name - The name of the crate.
 * @returns The generated URL for the crate.
 *
 */
function getURL(name: string): string {
  const lc = name.replace(/"/g, "").toLowerCase();
  let prefix: string;
  if (lc.length <= 2) {
    prefix = lc.length.toFixed(0);
  } else if (lc.length == 3) {
    prefix = `3/${lc.substring(0, 1)}`;
  } else {
    prefix = `${lc.substring(0, 2)}/${lc.substring(2, 4)}`;
  }
  return cleanURL(`${Settings.rust.index}/${prefix}/${lc}`);
}

