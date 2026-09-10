const DEFAULT_GO_PROXY = "https://proxy.golang.org";

/**
 * First usable HTTP(S) entry from GOPROXY (comma-separated).
 * Skips `direct`, `off`, and empty entries.
 */
export function firstHttpGoProxy(goproxy = process.env.GOPROXY): string | undefined {
  if (!goproxy || goproxy === "off") {
    return undefined;
  }
  for (const part of goproxy.split(",")) {
    const entry = part.trim().replace(/\/$/, "");
    if (!entry || entry === "direct" || entry === "off") {
      continue;
    }
    if (/^https?:\/\//i.test(entry)) {
      return entry;
    }
  }
  return undefined;
}

/**
 * Resolve the Go module proxy URL: prefer an explicit Dependi setting,
 * otherwise the first HTTP proxy from GOPROXY, else proxy.golang.org.
 */
export function resolveGoIndexServerURL(
  configured: string | undefined,
  hasUserOverride: boolean
): string {
  if (hasUserOverride && configured) {
    return configured.replace(/\/$/, "");
  }
  return (
    firstHttpGoProxy() ||
    configured?.replace(/\/$/, "") ||
    DEFAULT_GO_PROXY
  );
}

/**
 * Whether a module path should skip the public proxy (GOPRIVATE / GONOPROXY).
 */
export function isGoPrivateModule(
  modulePath: string,
  goprivate = process.env.GOPRIVATE,
  gonoproxy = process.env.GONOPROXY
): boolean {
  const patterns = [
    ...parseGoEnvList(goprivate),
    ...parseGoEnvList(gonoproxy),
  ];
  if (patterns.length === 0) {
    return false;
  }
  const path = modulePath.toLowerCase();
  return patterns.some((pattern) => matchGoPathPattern(path, pattern.toLowerCase()));
}

function parseGoEnvList(value?: string): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Prefix / glob match similar to Go's GOPRIVATE path patterns. */
function matchGoPathPattern(path: string, pattern: string): boolean {
  if (pattern.includes("*")) {
    const escaped = pattern
      .split("*")
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join(".*");
    return new RegExp(`^${escaped}(\\/|$)`).test(path);
  }
  return path === pattern || path.startsWith(`${pattern}/`);
}
