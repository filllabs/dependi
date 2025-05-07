import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from 'http';
import { makeRequest } from './request';

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
          const filteredVersions = Object.keys(response.releases).filter(
            (version) => {
              const releaseInfo = response.releases[version];
              return releaseInfo.every(
                (entry: { yanked: boolean }) => !entry.yanked
              );
            }
          );
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
  return cleanURL(`${Settings.python.index}/${name}/json`);
}
