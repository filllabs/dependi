import * as https from 'https';
import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";

export const versions = (name: string) => { // name eg: github.com/gorilla/mux
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
          info = {
            name: name,
            versions: body.toString().split('\n')
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
  const lower_name = name.toLowerCase();
  const url = `${Settings.go.index}/${lower_name}/@v/list`;
  return cleanURL(url);
}

