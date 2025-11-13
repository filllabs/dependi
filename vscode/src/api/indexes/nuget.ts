import { Settings } from "../../config";
import { DependencyInfo } from "../DepencencyInfo";
import { getReqOptions } from "../utils";
import { addResponseHandlersWithGzip, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from "http";
import { makeRequest } from "./request";

export const versions = (name: string) => {
  return new Promise<DependencyInfo>(function (resolve, reject) {
    const url = getApiUrl(name);
    const options = getReqOptions(url);

    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const { body, stream } = addResponseHandlersWithGzip(name, res, req, reject);
      let info: DependencyInfo;
      stream.on("end", () => {
        try {
          const response: Root = JSON.parse(Buffer.concat(body).toString());
          info = {
            name: name,
            versions: response.items
              .flatMap((item) => item.items || [])
              .filter((item) => item?.catalogEntry?.version)
              .map((item) => item.catalogEntry!.version),
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

function getApiUrl(name: string) {
  return cleanURL(`${Settings.csharp.index}/v3/registration5-gz-semver2/${name.toLowerCase()}/index.json`);
}

// generated type
type Root = {
  "@id": string
  "@type": Array<string>
  commitId: string
  commitTimeStamp: string
  count: number
  items: Array<{
    "@id": string
    "@type": string
    commitId: string
    commitTimeStamp: string
    count: number
    items?: Array<{
      "@id": string
      "@type": string
      commitId: string
      commitTimeStamp: string
      catalogEntry?: {
        "@id": string
        "@type": string
        authors: string
        dependencyGroups: Array<{
          "@id": string
          "@type": string
          dependencies: Array<{
            "@id": string
            "@type": string
            id: string
            range: string
            registration: string
          }>
          targetFramework: string
        }>
        description: string
        iconUrl: string
        id: string
        language: string
        licenseExpression: string
        licenseUrl: string
        readmeUrl: string
        listed: boolean
        minClientVersion: string
        packageContent: string
        projectUrl: string
        published: string
        requireLicenseAcceptance: boolean
        summary: string
        tags: Array<string>
        title: string
        version: string
      }
      packageContent: string
      registration: string
    }>
    parent: string
    lower: string
    upper: string
  }>
  "@context": {
    "@vocab": string
    catalog: string
    xsd: string
    items: {
      "@id": string
      "@container": string
    }
    commitTimeStamp: {
      "@id": string
      "@type": string
    }
    commitId: {
      "@id": string
    }
    count: {
      "@id": string
    }
    parent: {
      "@id": string
      "@type": string
    }
    tags: {
      "@id": string
      "@container": string
    }
    reasons: {
      "@container": string
    }
    packageTargetFrameworks: {
      "@id": string
      "@container": string
    }
    dependencyGroups: {
      "@id": string
      "@container": string
    }
    dependencies: {
      "@id": string
      "@container": string
    }
    packageContent: {
      "@type": string
    }
    published: {
      "@type": string
    }
    registration: {
      "@type": string
    }
  }
}
