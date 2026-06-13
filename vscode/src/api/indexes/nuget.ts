import { Settings } from "../../config";
import { getReqOptions } from "../utils";
import { addResponseHandlersWithGzip, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from "http";
import { makeRequest } from "./request";

type RegistrationPageRef = {
  "@id": string;
  items?: Array<{
    catalogEntry?: {
      version: string;
    };
  }>;
};

type RegistrationPage = {
  items?: RegistrationPageRef["items"];
};

export const versions = (name: string) => {
  return fetchRegistrationVersions(name).then((packageVersions) => ({
    name,
    versions: packageVersions,
  }));
};

async function fetchRegistrationVersions(name: string): Promise<string[]> {
  const response = await fetchJson<{ items: RegistrationPageRef[] }>(getApiUrl(name));
  const pageVersions = await Promise.all(
    (response.items ?? []).map(async (item) => {
      if (item.items && item.items.length > 0) {
        return extractVersions(item);
      }
      const page = await fetchJson<RegistrationPage>(item["@id"]);
      return extractVersions(page);
    })
  );
  return pageVersions.flat();
}

function extractVersions(page: RegistrationPage): string[] {
  return (page.items ?? [])
    .filter((item) => item?.catalogEntry?.version)
    .map((item) => item.catalogEntry!.version);
}

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

function getApiUrl(name: string) {
  return cleanURL(`${Settings.csharp.index}/v3/registration5-gz-semver2/${name.toLowerCase()}/index.json`);
}
