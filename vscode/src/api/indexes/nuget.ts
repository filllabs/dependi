import { Settings } from "../../config";
import { DependencyInfo } from "../DepencencyInfo";
import { getReqOptions } from "../utils";
import { addResponseHandlers, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import * as zlib from "zlib";
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

      // 2. Request (giden istek) için hata dinleyicileri
      req.on("error", function (err) {
        reject(err);
      });
      req.on("timeout", function () {
        req.destroy();
        reject(new Error(`Request to ${name} timed out`));
      });

      // 3. Gelen cevabın sıkıştırılmış olup olmadığını kontrol et
      let responseStream: NodeJS.ReadableStream;
      const contentEncoding = res.headers["content-encoding"];

      if (contentEncoding === "gzip") {
        // Cevap Gzip ise, zlib ile aç
        responseStream = res.pipe(zlib.createGunzip());
      } else {
        // Değilse, olduğu gibi kullan
        responseStream = res;
      }

      // Dekompresyon sırasında hata olursa yakala
      responseStream.on("error", (err) => {
        reject(err);
      });

      // 4. Veriyi dekompres edilmiş stream'den topla
      let body: any[] = [];
      responseStream.on("data", function (chunk) {
        body.push(chunk);
      });

      // 5. Dekompres edilmiş stream bittiğinde JSON'ı parse et
      responseStream.on("end", () => {
        try {
          const response: Root = JSON.parse(Buffer.concat(body).toString());
          const info: DependencyInfo = {
            name: name,
            versions: response.items
              .flatMap((item) => item.items)
              .map((item) => item.catalogEntry.version),
          };
          resolve(info);
        } catch (e) {
          reject(e);
        }
      }
      );
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
    items: Array<{
      "@id": string
      "@type": string
      commitId: string
      commitTimeStamp: string
      catalogEntry: {
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
