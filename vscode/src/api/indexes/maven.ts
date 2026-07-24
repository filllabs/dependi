import { XMLParser } from "fast-xml-parser";
import { Settings } from "../../config";
import { getReqOptions } from "../utils";
import { addResponseHandlersWithGzip, cleanURL, isStatusInvalid, ResponseError } from "./utils";
import { ClientRequest, IncomingMessage } from "http";
import { makeRequest } from "./request";

type MavenMetadata = {
  metadata?: {
    versioning?: {
      versions?: {
        version?: string | string[];
      };
    };
  };
};

export const versions = (name: string) => {
  const [groupId, artifactId] = name.split(":");
  if (!groupId || !artifactId) {
    return Promise.resolve({ name, versions: [] as string[] });
  }

  const groupPath = groupId.replace(/\./g, "/");
  const url = cleanURL(
    `${Settings.gradle.index}/${groupPath}/${artifactId}/maven-metadata.xml`
  );

  return fetchXml(url)
    .then((metadata) => {
      const rawVersions = metadata.metadata?.versioning?.versions?.version;
      const packageVersions = rawVersions
        ? Array.isArray(rawVersions)
          ? rawVersions
          : [rawVersions]
        : [];
      return { name, versions: packageVersions };
    })
    .catch(() => ({ name, versions: [] as string[] }));
};

function fetchXml(url: string): Promise<MavenMetadata> {
  return new Promise((resolve, reject) => {
    const options = getReqOptions(url);

    const handleResponse = (res: IncomingMessage, req: ClientRequest) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const { body, stream } = addResponseHandlersWithGzip(url, res, req, reject);
      stream.on("end", () => {
        try {
          const parser = new XMLParser({ ignoreAttributes: true });
          resolve(parser.parse(Buffer.concat(body).toString()) as MavenMetadata);
        } catch (e) {
          reject(e);
        }
      });
    };

    makeRequest(options, handleResponse, reject);
  });
}
