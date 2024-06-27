import * as https from 'https';
import NodeCache from "node-cache";
import { CrateMetadatas } from '../crateMetadatas';
import { filterNotSemverAndAbove100Versions, getReqOptions } from "../utils";
const cache = new NodeCache({ stdTTL: 60 * 10 });

export const versions = (name: string, indexServerURL: string) => { // name eg: github.com/gorilla/mux
  return new Promise<CrateMetadatas>(function (resolve, reject) {
    const cached = cache.get<CrateMetadatas>(name);
    if (cached) {
      resolve(cached);
      return;
    }
    const lower_name = name.toLowerCase();

    const url = `${indexServerURL}/${lower_name}/@v/list`;
    const options = getReqOptions(url);
    var req = https.get(options, function (res) {
      // reject on bad status
      if (!res.statusCode) {
        reject(new Error(`statusCode=${res.statusCode}: ${options.host}`));
        return;
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`statusCode=${res.statusCode}: ${url}`));
      }
      // cumulate data
      var crate_metadatas: CrateMetadatas;
      let body: any = [];
      res.on('data', function (chunk) {
        body = chunk.toString('utf8').split('\n');
      });
      // resolve on end
      res.on('end', function () {
        try {
          crate_metadatas = {
            name: name,
            versions: body,
            features: [] // proxy site does not provide any features data for versions.
          };
          crate_metadatas.versions = filterNotSemverAndAbove100Versions(crate_metadatas.versions);

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
