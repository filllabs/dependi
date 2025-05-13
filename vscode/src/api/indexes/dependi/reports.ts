import { request } from ".";
import { Settings } from "../../../config";
import { CommitShortStat } from "../../git";
export interface VulnCount {
  previous: number;
  current: number;
}

export interface ReportItem {
  Key: string;
  Value: string;
}

export interface Commit {
  hash: string;
  message: string;
  parents: string[];
  authorDate?: Date;
  authorName?: string;
  authorEmail?: string;
  commitDate?: Date;
  shortStat?: CommitShortStat;
}
export interface VulnReq {
  RepoName: string;
  Commits: Commit[];
  PreviousItems: ReportItem[];
  CurrentItems: ReportItem[];
  Language: Language;
  GHSACheck: boolean;
  Author?: string;
}

export enum Language {
  None = 0,
  Rust,
  Golang,
  JS,
  Python,
  PHP,
  Dart,
}

const LanguageArray = [
  { ID: Language.Rust, Name: "Cargo.toml" },
  { ID: Language.Golang, Name: "go.mod" },
  { ID: Language.JS, Name: "package.json" },
  { ID: Language.PHP, Name: "composer.json" },
  { ID: Language.Python, Name: "requirements.txt" },
];

export const getLangIdFromName = (name: string): Language => LanguageArray.find((lang) => lang.Name === name)?.ID ?? Language.None;

export async function getVulnReport(req: VulnReq, options?: RequestInit) {
  const response = await request<string>(`v1/reports/vulnerability`, {
    method: "POST",
    headers: {
      Authorization: Settings.api.key,
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
    ...options,
  });
  return response;
}

export async function getCurrentVulnReport(req: VulnReq, options?: RequestInit) {
  const response = await request<string>(`v1/reports/vulnerability/current`, {
    method: "POST",
    headers: {
      Authorization: Settings.api.key,
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
    ...options,
  });
  return response;
}

export async function getReportPDF(req: string, options?: RequestInit) {
  return await request<Blob>(`v1/reports/pdf`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      Authorization: Settings.api.key,
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json",
    },
    ...options,
  });
}
