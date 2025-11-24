import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from 'http';
import { makeRequest } from './request';
import { URL } from 'url';

export const versions = (name: string, indexServerURL?: string, registryToken?: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    // If indexServerURL is provided, use it. Otherwise use default from settings.
    // If it is explicitly undefined (e.g. custom registry with no index), we should probably have returned early in caller.
    if (!indexServerURL) {
       // If we are here, we assume indexServerURL is valid or we default to crates.io.
       // But for custom registries, if indexServerURL is passed as undefined, it means we shouldn't fetch.
       indexServerURL = Settings.rust.index;
    }
    
    // compute sparse index prefix
    const urlStr = getURL(name, indexServerURL);
    
    // If we have a token, we need to add it to headers.
    const url = new URL(urlStr);
    const options: any = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        protocol: url.protocol,
        headers: {},
        method: 'GET'
    };
    
    if (registryToken) {
        options.headers['Authorization'] = registryToken;
    }

    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      let body = addResponseHandlers(name, res, req, reject);
      let info: DependencyInfo;
      res.on("end", () => {
        try {
          const bodyString = Buffer.concat(body).toString();
          const bodyArray = bodyString.split('\n').filter(n => n).map(line => JSON.parse(line));
          info = {
            name: name,
            versions: bodyArray.filter((e: any) => e.yanked === false).map((e: any) => e.vers),
            features: Object.keys(bodyArray.at(-1).features).filter(feature => feature !== "default")
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

/**
 * Generates a URL for a given crate name based on its length and structure.
 *
 * @param name - The name of the crate.
 * @returns The generated URL for the crate.
 *
 */
function getURL(name: string, indexServerURL: string): string {
  const lc = name.replace(/"/g, "").toLowerCase();
  let prefix: string;
  if (lc.length <= 2) {
    prefix = lc.length.toFixed(0);
  } else if (lc.length == 3) {
    prefix = `3/${lc.substring(0, 1)}`;
  } else {
    prefix = `${lc.substring(0, 2)}/${lc.substring(2, 4)}`;
  }
  const baseUrl = indexServerURL.endsWith('/') ? indexServerURL : indexServerURL + '/';
  return cleanURL(`${baseUrl}${prefix}/${lc}`);
}
