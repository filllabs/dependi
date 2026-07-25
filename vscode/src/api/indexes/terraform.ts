import { Settings } from "../../config";
import { DependencyInfo } from '../DepencencyInfo';
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from 'http';
import { makeRequest } from './request';

export const versions = (name: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    // name format: "namespace/name/provider" or "terraform-aws-modules/vpc/aws"
    const parts = name.split('/');
    if (parts.length !== 3) {
      return reject(new Error(`Invalid Terraform module name format: ${name}. Expected format: namespace/name/provider`));
    }

    const [namespace, moduleName, provider] = parts;
    const url = getURL(namespace, moduleName, provider);
    const options = getReqOptions(url);

    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info: DependencyInfo;
      res.on("end", () => {
        try {
          const bodyString = Buffer.concat(body).toString();
          const json = JSON.parse(bodyString);
          
          if (!json.modules || !json.modules[0] || !json.modules[0].versions) {
            return reject(
              new Error(`Invalid response from Terraform Registry: no versions found for ${name}`)
            );
          }

          // Extract version strings from the response
          const versionList = json.modules[0].versions.map((v: any) => v.version);
          
          info = {
            name: name,
            versions: versionList,
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

function getURL(namespace: string, name: string, provider: string) {
  // Terraform Registry API v1 endpoint
  const baseUrl = Settings.terraform.index || "https://registry.terraform.io";
  const url = `${baseUrl}/v1/modules/${namespace}/${name}/${provider}/versions`;
  return cleanURL(url);
}
