import * as https from 'https';
import NodeCache from "node-cache";
import { CrateMetadatas } from '../crateMetadatas';
import { getReqOptions } from "../utils";
const cache = new NodeCache({ stdTTL: 60 * 10 });

export const versions = (name: string, indexServerURL: string) => {
  return new Promise<CrateMetadatas>(function (resolve, reject) {
    const cached = cache.get<CrateMetadatas>(name);
    if (cached) {
      resolve(cached);
      return;
    }
    const url = `${indexServerURL}/${name}/json`;
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
      let data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      // resolve on end
      res.on('end', function () {
        try {
          const response = JSON.parse(data);
          const versions = Object.keys(response.releases);
          crate_metadatas = {
            name: name,
            versions: versions,
            features: []
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