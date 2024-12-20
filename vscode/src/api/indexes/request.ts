import * as https from "https";
import http from "http";
import { cleanURL, isStatusRedirect } from "./utils";
import { getReqOptions } from "../utils";
import { ClientRequest, IncomingMessage } from "http";

export const makeRequest = (
  requestOptions: any,
  handleResponse: (res: IncomingMessage, req: ClientRequest) => void,
  reject: (error: any) => void,
  headersAccept?: string
) => {
  let protocol = requestOptions.protocol === "http:" ? http : https;
  const req = protocol
    .get(requestOptions, (res) => {
      if (isStatusRedirect(res) && res.headers.location) {
        const newUrl = cleanURL(res.headers.location);
        const newOptions = getReqOptions(newUrl);
        if (headersAccept) {
          newOptions.headers = {
            Accept: headersAccept,
          };
        }
        protocol = newOptions.protocol  === "http:" ? http : https;
        const redirectReq = protocol
          .get(newOptions, (redirectRes) => {
            handleResponse(redirectRes, redirectReq);
          })
          .on("error", reject);

        redirectReq.end();
      } else {
        handleResponse(res, req);
      }
    })
    .on("error", reject);

  req.end();
};
