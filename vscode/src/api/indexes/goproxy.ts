import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, isStatusRedirect, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from 'http';
import { makeRequest } from './request';

export const versions = (name: string) => { // name eg: github.com/gorilla/mux
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
          info = {
            name: name,
            versions: body.toString().split('\n')
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    }

    makeRequest(options, handleResponse, reject);
  });
};
function getURL(name: string) {
  const lower_name = name.toLowerCase();
  const url = `${Settings.go.index}/${lower_name}/@v/list`;
  return cleanURL(url);
}

