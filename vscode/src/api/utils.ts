import { RequestOptions } from "http";
import os from 'os';
import { Settings } from "../config";
const semverMajor = require("semver/functions/major");

function getOSInfo(): string {
  const platform = os.platform();
  const release = os.release();
  let osInfo = 'Unknown OS';

  switch (platform) {
    case 'win32':
      osInfo = 'Windows';
      if (release.startsWith('10')) osInfo += ' 10';
      else if (release.startsWith('6.3')) osInfo += ' 8.1';
      else if (release.startsWith('6.2')) osInfo += ' 8';
      else if (release.startsWith('6.1')) osInfo += ' 7';
      break;
    case 'darwin':
      osInfo = 'Mac OS X';
      const macVersion = release.split('.').slice(0, 2).join('.');
      osInfo += ` ${macVersion}`;
      break;
    case 'linux':
      osInfo = 'Linux';
      break;
    default:
      osInfo = platform;
  }

  return osInfo;
}

function customUserAgent(): string {
  return `Dependi (https://www.dependi.io) (${Settings.version}) - ${getOSInfo()}`;
}

export const UserAgent = customUserAgent();

export function getReqOptions(url: string): RequestOptions {
  const u = new URL(url);
  const options: RequestOptions = {
    protocol: u.protocol,
    hostname: u.hostname,
    port: u.port,
    path: u.pathname + u.search,
    headers: {
      'User-Agent': UserAgent
    },
  };
  return options;
}


