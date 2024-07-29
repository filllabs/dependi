import { window } from "vscode";
import { request } from ".";

import { Configs } from "../../../config";
import Dependency from "../../../core/Dependency";
import { Logger } from "../../../extension";
import { openDeviceLimitDialog, openPaymentRequiredDialog, openSettingsDialog } from "../../../ui/dialogs";
import { Errors, getError } from "./errors";
import { Language } from "./reports";

export interface VersionsResp {
  Name: string;
  Versions?: Array<string>;
  Vulns?: Map<string, string[]>;
  ETag?: string;
  Error?: string;
}

export interface VersionsReq {
  Language: Language;
  Packages: string[];
  IgnoreUnstables: boolean;
  Dependencies?: Dependency[] | VersionsResp[];
  VulnerabilityCheck: boolean;
  GhsaCheck?: boolean;
}

export async function getVersions(value: VersionsReq, options?: RequestInit) {
  const mappedVal: VersionsReq = {
    Language: value.Language,
    Packages: value.Packages,
    IgnoreUnstables: value.IgnoreUnstables,
    VulnerabilityCheck: value.VulnerabilityCheck,
    GhsaCheck: value.GhsaCheck,
  };
  return await request<VersionsResp[]>(`v1/indexes`, {
    method: "POST",
    body: JSON.stringify(mappedVal),
    ...options,
  })
    .then((resp) => {
      if (resp.status !== 200) {
        switch (getError(resp.error)) {
          case Errors.DLR:
            openDeviceLimitDialog();
            return [];
          case Errors.PAYRQ:
            openPaymentRequiredDialog();
            return [];
          case Errors.UNAUTH:
            openSettingsDialog(Configs.INDEX_SERVER_API_KEY, "Unauthorized, please check your api key.");
            return [];
          case Errors.IVAK:
            openSettingsDialog(Configs.INDEX_SERVER_API_KEY, "Invalid api key or api key not found. Please check your api key.");
            return [];
          case Errors.UINA:
            openSettingsDialog(Configs.INDEX_SERVER_API_KEY, "User is not active. Please check emails from us or visit dependi.io dashboard.");
          default:
            window.showErrorMessage(getError(resp.error));
            return [];
        }
      }
      const versions = resp.body?.filter((o) => o?.Name);
      const versionsMap = new Map(
        versions?.map((version) => [version.Name, version])
      );

      const deps = (value.Dependencies as Dependency[]).map(
        (dep: Dependency) => {
          const matchingVersion = versionsMap.get(dep.item.key);

          if (matchingVersion && matchingVersion.Versions) {
            // Update the 'versions' field with VersionsResp's 'Versions'
            dep.versions = matchingVersion.Versions;

            if (matchingVersion.Vulns) {
              const vulnEntries = Object.entries(matchingVersion.Vulns);
              dep.vulns = new Map(vulnEntries);
            }
          }

          return dep;
        }
      );
      return deps;
    })
    .catch((err) => {
      console.error("Catch get versions", err);
      Logger.appendLine("Catch get versions: " + err);
      return [];
    });
}

export const Indexes = {
  getVersions,
};
