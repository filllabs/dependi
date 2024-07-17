import * as https from 'https';
import { CrateMetadatas } from '../crateMetadatas';
import NodeCache from "node-cache";
import { getReqOptions } from "../utils";

const cache = new NodeCache({ stdTTL: 60 * 10 });

export const versions = (name: string, indexServerURL: string) => {
  // clean dirty names
  name = name.replace(/"/g, "");

  return new Promise<CrateMetadatas>(function (resolve, reject) {
    const cached = cache.get<CrateMetadatas>(name);
    if (cached) {
      resolve(cached);
      return;
    }
    // compute sparse index prefix
    let prefix: string;
    const lower_name = name.toLowerCase();
    if (lower_name.length <= 2) {
      prefix = lower_name.length.toFixed(0);
    } else if (lower_name.length == 3) {
      prefix = "3/" + lower_name.substring(0, 1);
    } else {
      prefix = lower_name.substring(0, 2) + "/" + lower_name.substring(2, 4);
    }
    const url = `${indexServerURL}/${prefix}/${lower_name}`;
    const options = getReqOptions(url);
    var req = https.get(options, function (res) {
      // reject on bad status
      if (!res.statusCode) {
        reject(new Error(`statusCode=${res.statusCode}: ${url}`));
        return;
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`statusCode=${res.statusCode}: ${url}`));
      }
      // cumulate data
      var crate_metadatas: CrateMetadatas;
      var body: any = [];
      res.on('data', function (chunk) {
        body.push(chunk);
      });
      // resolve on end
      res.on('end', function () {
        try {
          var body_lines = Buffer.concat(body).toString().split('\n').filter(n => n);
          var body_array: any = [];
          for (var line of body_lines) {
            body_array.push(JSON.parse(line));
          }
          crate_metadatas = {
            name: name,
            versions: body_array.filter((e: any) => e.yanked === false).map((e: any) => e.vers),
            features: Object.keys(body_array.at(-1).features).filter(feature => feature !== "default")
          };

          cache.set(name, crate_metadatas);
        } catch (e) {
          reject(e);
        }
        resolve(crate_metadatas);
      });
    });
    // reject on request error
    req.on('error', function (err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    // IMPORTANT
    req.end();
  });
};

// Check if `config.json` exists at root of `indexServerURL`
export async function isSparseCompatible(indexServerURL: string): Promise<boolean> {
  return new Promise<boolean>(function (resolve, reject) {
    const cached = cache.get<boolean>(indexServerURL);
    if (cached) {
      resolve(cached);
      return;
    }

    var req = https.get(`${indexServerURL}/config.json`, (res) => {
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300 && res.headers['content-type'] === "application/json") {
        cache.set(indexServerURL, true);
        resolve(true);
      } else {
        cache.set(indexServerURL, false);
        resolve(false);
      }
    }).on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}
