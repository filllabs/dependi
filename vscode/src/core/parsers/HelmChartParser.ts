import { TextDocument } from "vscode";
import Item from "../Item";
import { Parser } from "./parser";
import { Settings } from "../../config";
import { parseDocument, YAMLMap, YAMLSeq, Scalar, isAlias } from "yaml";

/**
 * HelmChartParser (YAML based)
 * Parses Chart.yaml dependencies using the 'yaml' package (eemeli/yaml).
 *
 * Supported dependency entry forms:
 * dependencies:
 *  - name: nginx
 *    version: 15.10.0
 *    repository: https://charts.bitnami.com/bitnami
 *    alias: web
 *
 *  - { name: redis, version: 17.1.0, repository: "https://charts.bitnami.com/bitnami" }
 *
 * We require name + version + repository to emit an Item.
 * Alias is optional (used as display key if present).
 */
export class HelmChartParser implements Parser {
  parse(doc: TextDocument): Item[] {
    const items: Item[] = [];
    if (!doc) return items;

    // Acquire full text (supports VSCode TextDocument & test harness mock)
    const text = (doc as any).getText?.() || buildTextFromLines(doc); // fallback (should rarely happen after harness update)

    // Precompute line start offsets for offset->(line,char) mapping
    const lineStarts = computeLineStarts(text);

    const ydoc = parseDocument(text);

    if (ydoc.errors && ydoc.errors.length) {
      // Strict: on YAML structural errors return empty (no fallback legacy parser)
      return items;
    }

    const depsNode = ydoc.get("dependencies", true);
    if (!depsNode || !(depsNode instanceof YAMLSeq)) {
      return items;
    }

    for (let entry of depsNode.items) {
      if (!entry) continue;

      if (isAlias(entry)) {
        // Resolve alias target if possible
        entry = entry.resolve(ydoc) as any;
      }
      if (!(entry instanceof YAMLMap)) continue;

      const nameInfo = getScalar(entry, "name");
      const versionInfo = getScalar(entry, "version");
      const repoInfo = getScalar(entry, "repository");
      const aliasInfo = getScalar(entry, "alias");

      if (!nameInfo?.value || !versionInfo?.value || !repoInfo?.value) {
        continue;
      }

      const versionNode = versionInfo.node;
      if (!versionNode || !Array.isArray((versionNode as any).range)) {
        continue;
      }
      const [startOffset, endOffset] = (versionNode as any).range as [
        number,
        number
      ];

      const startPos = offsetToPos(startOffset, lineStarts);
      const endPos = offsetToPos(endOffset, lineStarts);

      const item = new Item();
      item.key = aliasInfo?.value || nameInfo.value;
      item.chartName = nameInfo.value;
      item.repository = normalizeRepo(repoInfo.value);
      item.value = versionInfo.value;

      // Fill positional metadata
      item.line = startPos.line;
      item.start = startPos.character;
      item.end = endPos.character;
      const lineText = safeLineText(doc, item.line);
      item.endOfLine = lineText.length;

      // Ignore via regex pattern if configured (evaluate against trimmed line text)
      if (shouldIgnoreLine(lineText)) {
        continue;
      }

      item.createRange();
      item.createDecoRange();
      if (item.isValid()) {
        items.push(item);
      }
    }

    return items;
  }
}

/* ------------------------------ Helpers ------------------------------ */

function getScalar(
  map: YAMLMap,
  key: string
): { value: string; node: Scalar } | null {
  const node = map.get(key, true) as any;
  if (!node) return null;
  if (node instanceof Scalar) {
    if (node.value === null || node.value === undefined) return null;
    return { value: String(node.value), node };
  }
  return null;
}

function buildTextFromLines(doc: TextDocument): string {
  const lines: string[] = [];
  for (let i = 0; i < doc.lineCount; i++) {
    lines.push(doc.lineAt(i).text);
  }
  return lines.join("\n");
}

function computeLineStarts(text: string): number[] {
  const starts: number[] = [0];
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) === 10) {
      starts.push(i + 1);
    }
  }
  return starts;
}

function offsetToPos(
  offset: number,
  lineStarts: number[]
): { line: number; character: number } {
  // Binary search
  let low = 0;
  let high = lineStarts.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const lineStart = lineStarts[mid];
    const nextLineStart =
      mid + 1 < lineStarts.length ? lineStarts[mid + 1] : Infinity;
    if (offset >= lineStart && offset < nextLineStart) {
      return { line: mid, character: offset - lineStart };
    } else if (offset < lineStart) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  // Fallback
  const last = lineStarts[lineStarts.length - 1];
  return { line: lineStarts.length - 1, character: Math.max(0, offset - last) };
}

function safeLineText(doc: TextDocument, line: number): string {
  if (line < 0 || line >= doc.lineCount) return "";
  return doc.lineAt(line).text;
}

function shouldIgnoreLine(lineText: string): boolean {
  const trimmed = lineText.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("#")) return true;
  if (Settings.helm?.ignoreLinePattern) {
    try {
      const r = new RegExp(Settings.helm.ignoreLinePattern);
      if (r.test(trimmed)) return true;
    } catch {
      // ignore invalid pattern
    }
  }
  return false;
}

function normalizeRepo(repo: string): string {
  let r = repo.trim();
  if (r.endsWith("/")) r = r.slice(0, -1);
  return r;
}
