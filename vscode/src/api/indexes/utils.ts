import { ClientRequest, IncomingMessage } from "http";

export function ResponseError(res: IncomingMessage) {
  return new Error(`statusCode=${res.statusCode}: ${res.url}`);
}


export function isStatusInvalid(res: IncomingMessage) {
  // reject on bad status
  if (!res.statusCode) {
    return true;
  }
  if (res.statusCode < 200 || res.statusCode >= 300) {
    return true;
  }
  return false;
}

export function isStatusRedirect(res: IncomingMessage) {
  if (!res.statusCode) {
    return false;
  }
  return res.statusCode >= 300 && res.statusCode < 400;
}

export function addResponseHandlers(name: string, res: IncomingMessage, req: ClientRequest, reject: (reason?: any) => void) {
  let body: any[] = [];
  res.on('data', function (chunk) {
    body.push(chunk);
  });
  req.on('error', function (err) {
    reject(err);
  });
  req.on('timeout', function () {
    req.destroy();
    reject(new Error(`Request to ${name} timed out`));
  });
  return body;
}

export function cleanURL(url: string) {
  // delete double slashes in the URL
  let clean = url.replace("///", "");
  // delete trailing slashes in the URL
  if (clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }
  return clean;
}