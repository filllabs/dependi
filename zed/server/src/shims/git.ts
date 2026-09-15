import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { getActiveFileName, Uri } from "./vscode";

const exec = promisify(execFile);

export type CommitShortStat = {
  files: number;
  insertions: number;
  deletions: number;
};

export type Commit = {
  hash: string;
  message: string;
  parents: string[];
  authorDate?: Date;
  authorName?: string;
  authorEmail?: string;
  commitDate?: Date;
  shortStat?: CommitShortStat;
};

export type LogOptions = {
  maxEntries?: number;
  path?: string;
};

type GitRepository = {
  rootUri: Uri;
  log: (options?: LogOptions) => Promise<Commit[]>;
  show: (ref: string, filePath: string) => Promise<string>;
};

function findGitRoot(filePath: string): string | undefined {
  let dir = path.dirname(filePath);
  while (true) {
    if (existsSync(path.join(dir, ".git"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      return undefined;
    }
    dir = parent;
  }
}

async function git(cwd: string, args: string[]): Promise<string> {
  const { stdout } = await exec("git", args, { cwd, maxBuffer: 10 * 1024 * 1024 });
  return stdout;
}

function toRelative(root: string, filePath: string): string {
  const relative = path.relative(root, filePath);
  return relative.split(path.sep).join("/");
}

function createRepository(root: string): GitRepository {
  const rootUri = Uri.file(root);
  return {
    rootUri,
    async log(options?: LogOptions): Promise<Commit[]> {
      const max = options?.maxEntries ?? 32;
      const args = ["log", `--max-count=${max}`, "--format=%H%x1f%an%x1f%ae%x1f%s%x1e"];
      if (options?.path) {
        const relative = options.path.startsWith(root)
          ? toRelative(root, options.path)
          : options.path.replace(/^\//, "");
        args.push("--", relative);
      }
      const output = await git(root, args);
      return output
        .split("\x1e")
        .map((chunk) => chunk.trim())
        .filter(Boolean)
        .map((chunk) => {
          const [hash, authorName, authorEmail, message] = chunk.split("\x1f");
          return {
            hash,
            authorName,
            authorEmail,
            message: message ?? "",
            parents: [],
          };
        });
    },
    async show(ref: string, filePath: string): Promise<string> {
      const relative = filePath.startsWith(root) ? toRelative(root, filePath) : filePath.replace(/^\//, "");
      return git(root, ["show", `${ref}:${relative}`]);
    },
  };
}

export type GitExtension = {
  enabled: boolean;
  getAPI: (version: 1) => { repositories: GitRepository[] };
};

export function gitExtensionFor(filePath?: string): GitExtension {
  const empty: GitExtension = { enabled: true, getAPI: () => ({ repositories: [] }) };
  const target = filePath || getActiveFileName();
  if (!target) {
    return empty;
  }
  const root = findGitRoot(target);
  if (!root) {
    return empty;
  }
  const repo = createRepository(root);
  return {
    enabled: true,
    getAPI: () => ({ repositories: [repo] }),
  };
}
