import { extensions, window, workspace, commands, Uri } from "vscode";
import { Commit, GitExtension, Repository } from "../../api/git";
import { Parser } from "../../core/parsers/parser";
import Item from "../../core/Item";
import { winHelper } from "./utils";

export async function getRepo(): Promise<{ repo: Repository }> {
    const gitExtension = extensions.getExtension<GitExtension>("vscode.git")!.exports;
    
    if (!gitExtension) {
        throw new Error("Git extension not found");
    }
    const api = gitExtension.getAPI(1);
    
    const repos = api.repositories;
    if (!repos || repos.length === 0) {
        throw new Error("No repository found");
    }
    const activeEditor = window.activeTextEditor;
    if (!activeEditor) {
        throw new Error("Active editor not found");
    }
    const activeFilePath = activeEditor.document.uri.path
    const repo = repos.find((repo) => activeFilePath.includes(repo.rootUri.path))!;

    return { repo };
}
export async function getRepoDetails(): Promise<{ repoName: string | undefined, repoRootUri: Uri }> {
  const { repo } = await getRepo();
  const repoRootUri = repo.rootUri;
  let repoName: string | undefined;
  const path = winHelper(repoRootUri.path)
  if (repoRootUri) {
      repoName = path.split('/').pop();
  }
  return { repoName, repoRootUri };
}

export async function getCommitHistory(repo: Repository): Promise<{ commits: Commit[] }> {
    const editor = window.activeTextEditor;
    if (!editor) {
        throw new Error("Active editor not found");
    }
    const uri = editor.document.uri;

    const newUriPath = winHelper(uri.path);

    const commits = await repo.log({ path: newUriPath });



    if (!commits || commits.length === 0) {
        throw new Error("There is no commit history on the active file");
    }

    return { commits };
}

export async function parseTextDocument(parser: Parser, repo: Repository, commitId: string, activeFileLanguage: string): Promise<Item[]> {
  const uri = winHelper(window.activeTextEditor!.document.uri.path)
  const file = await repo.show(commitId, uri);
  const textDocumentFile = await workspace.openTextDocument({
      language: activeFileLanguage,
      content: file,
  });
  window.showTextDocument(textDocumentFile).then(() =>
      commands.executeCommand("workbench.action.revertAndCloseActiveEditor")
  );

  return parser.parse(textDocumentFile);
}