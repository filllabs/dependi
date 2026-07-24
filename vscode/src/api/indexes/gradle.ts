import { getReqOptions } from "../utils";
import { addResponseHandlersWithGzip, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from "http";
import { makeRequest } from "./request";

type GradleVersionEntry = {
  version: string;
};

export const gradleVersions = () => {
  return fetchJson<GradleVersionEntry[]>(
    "https://services.gradle.org/versions/all"
  ).then((entries) => ({
    name: "gradle",
    versions: entries.map((entry) => entry.version).filter(Boolean),
  }));
};

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const options = getReqOptions(url);

    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const { body, stream } = addResponseHandlersWithGzip(url, res, req, reject);
      stream.on("end", () => {
        try {
          resolve(JSON.parse(Buffer.concat(body).toString()) as T);
        } catch (e) {
          reject(e);
        }
      });
    };

    makeRequest(options, handleResponse, reject);
  });
}
