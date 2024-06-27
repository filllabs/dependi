import {
  window,
} from "vscode";
import { ReportItem, VulnReq, getLangIdFromName, getVulnReport } from "../../api/index/dependi-index-server/reports";
import { Settings } from "../../config";
import Item from "../../core/Item";
import { Parser } from "../../core/parsers/parser";
import {
  getCommitHistory,
  getRepo,
  getRepoDetails,
  parseTextDocument,
} from "./gitActions";
import { parserInvoker } from "./utils";

type ProgressStep = 'fetchingRepository' | 'parsingFile' | 'comparingFiles' | 'generatingReport' | 'creatingUI';

const progressSteps: Record<ProgressStep, { label: string; percentage: number; }> = {
  fetchingRepository: { label: "Fetching current repository", percentage: 5 },
  parsingFile: { label: "Parsing current file", percentage: 10 },
  comparingFiles: { label: "Comparing files", percentage: 25 },
  generatingReport: { label: "Generating vulnerability report", percentage: 55 },
  creatingUI: { label: "Creating Report", percentage: 80 },
};

async function fetchRepositoryData() {
  const { repo } = await getRepo();
  const { commits } = await getCommitHistory(repo);
  const { repoName, repoRootUri } = await getRepoDetails();
  const commitId = commits[0]?.hash;

  if (!commitId) {
    throw new Error("No commits found in the repository.");
  }

  return { repo, commits, repoName, repoRootUri, commitId };
}

async function getActiveEditorLanguage() {
  const editor = window.activeTextEditor;
  if (!editor) {
    throw new Error("Active editor not found");
  }
  const filePath = editor.document.fileName || "";
  if (filePath === "") {
    throw new Error("File name has not been found.");
  }
  const fileName = filePath.split(/[/\\]/).pop();
  if (!fileName) {
    throw new Error("Failed to extract file name with extension.");
  }

  return { editor, fileName };
}

function incrementProgress(progress: any, step: ProgressStep, totalPercentage: number) {
  const { percentage, label } = progressSteps[step];
  progress.report({
    increment: percentage,
    message: `Progress: ${totalPercentage + percentage}% ${label}`,
  });
  return totalPercentage + percentage;
}

async function parseFiles(parser: Parser, repo: any, commitId: string, activeFileLanguage: string) {
  const editor = window.activeTextEditor;
  if (!editor) {
    throw new Error("Active editor not found");
  }

  const currentItems: Item[] = parser.parse(editor.document);
  const previousItems: Item[] = await parseTextDocument(
    parser,
    repo,
    commitId,
    activeFileLanguage
  );

  const currentReportItems: ReportItem[] = currentItems.map((item) => ({
    Key: item.key,
    Value: item.value || "",
  }));
  const previousReportItems: ReportItem[] = previousItems.map((item) => ({
    Key: item.key,
    Value: item.value || "",
  }));

  return { currentReportItems, previousReportItems };
}

export async function generateMainReport(progress: any) {
  let totalPercentage = 0;

  try {
    totalPercentage = incrementProgress(progress, "fetchingRepository", totalPercentage);
    const { repo, commits, repoName, repoRootUri, commitId } = await fetchRepositoryData();

    const { fileName } = await getActiveEditorLanguage();

    totalPercentage = incrementProgress(progress, "parsingFile", totalPercentage);
    const parser: Parser = parserInvoker(fileName);

    const { currentReportItems, previousReportItems } = await parseFiles(parser, repo, commitId, fileName);

    if (!repoRootUri) {
      throw new Error("Repository root URI not found");
    }

    totalPercentage = incrementProgress(progress, "generatingReport", totalPercentage);
    const vulnRequest: VulnReq = {
      RepoName: repoName || "",
      Commits: commits || [],
      PreviousItems: previousReportItems,
      CurrentItems: currentReportItems,
      Language: getLangIdFromName(fileName),
      GHSACheck: Settings.vulnerability.ghsa,
    };

    const reportResp = await getVulnReport(vulnRequest);
    if (!reportResp) {
      throw new Error("Failed to generate report");
    }

    const reportHTML: string = reportResp.body || "";
    totalPercentage = incrementProgress(progress, "creatingUI", totalPercentage);
    return reportHTML;
  } catch (error) {
    throw new Error(`Error during report generation: ${error}`);
  }
}