import * as https from "https";
import http from "http";
import { isStatusRedirect } from "./utils";
import { getReqOptions } from "../utils";
import { ClientRequest, IncomingMessage, RequestOptions } from "http";

const MAX_REDIRECTS = 5;

function buildRequestUrl(options: RequestOptions): string {
  const protocol = options.protocol || "https:";
  const host = options.hostname || options.host || "";
  const port = options.port ? `:${options.port}` : "";
  const path = options.path || "/";
  return `${protocol}//${host}${port}${path}`;
}

function resolveRedirectUrl(location: string, currentUrl: string): string {
  // Location may be absolute or relative (common with Azure Artifacts 307s).
  // Do not strip trailing slashes — they are significant for many indexes.
  return new URL(location, currentUrl).href;
}

function applyRedirectHeaders(
  newOptions: RequestOptions,
  requestOptions: RequestOptions,
  headersAccept?: string
) {
  newOptions.headers = {
    ...newOptions.headers,
    ...(requestOptions.headers || {}),
  };
  if (headersAccept) {
    newOptions.headers = {
      ...newOptions.headers,
      Accept: headersAccept,
    };
  }
  // Keep auth on same-host redirects when the Location URL has none.
  if (
    requestOptions.auth &&
    !newOptions.auth &&
    requestOptions.hostname === newOptions.hostname
  ) {
    newOptions.auth = requestOptions.auth;
  }
}

export const makeRequest = (
  requestOptions: RequestOptions,
  handleResponse: (res: IncomingMessage, req: ClientRequest) => void,
  reject: (error: any) => void,
  headersAccept?: string,
  redirectCount = 0
) => {
  const protocol = requestOptions.protocol === "http:" ? http : https;
  const currentUrl = buildRequestUrl(requestOptions);

  const req = protocol
    .get(requestOptions, (res) => {
      if (isStatusRedirect(res) && res.headers.location) {
        if (redirectCount >= MAX_REDIRECTS) {
          reject(new Error(`Too many redirects for ${currentUrl}`));
          return;
        }
        try {
          const location = Array.isArray(res.headers.location)
            ? res.headers.location[0]
            : res.headers.location;
          const newUrl = resolveRedirectUrl(location, currentUrl);
          const newOptions = getReqOptions(newUrl);
          applyRedirectHeaders(newOptions, requestOptions, headersAccept);
          makeRequest(
            newOptions,
            handleResponse,
            reject,
            headersAccept,
            redirectCount + 1
          );
        } catch (e) {
          reject(e);
        }
        return;
      }
      handleResponse(res, req);
    })
    .on("error", reject);

  // http.get() ends the request automatically; do not call req.end() again.
};
