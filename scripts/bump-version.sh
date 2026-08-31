#!/usr/bin/env bash
# Bump VS Code and Zed to the same semver. Does not commit or tag.
set -euo pipefail

VERSION="${1:-}"
if [[ ! "${VERSION}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "usage: $0 <major.minor.patch>   e.g. $0 1.50.1" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

(cd "${ROOT}/vscode" && npm version "${VERSION}" --no-git-tag-version --allow-same-version)
(cd "${ROOT}/zed/server" && npm version "${VERSION}" --no-git-tag-version --allow-same-version)

perl -i -pe "s/^version = \".*\"/version = \"${VERSION}\"/" \
  "${ROOT}/zed/extension.toml" \
  "${ROOT}/zed/Cargo.toml"

perl -i -0pe "s/(name = \"zed_dependi\"\nversion = \")[^\"]+/\${1}${VERSION}/" \
  "${ROOT}/zed/Cargo.lock"

perl -i -pe "s/Settings\.version = \".*\"/Settings.version = \"${VERSION}\"/" \
  "${ROOT}/zed/server/src/settings.ts"

(cd "${ROOT}/zed/server" && npm run build)

echo "Bumped VS Code and Zed to ${VERSION}."
echo "Next:"
echo "  1. Update vscode/changelog.md and zed/changelog.md"
echo "  2. Commit, then tag and push: git tag v${VERSION} && git push origin v${VERSION}"
echo "     (publishes VS Marketplace, OpenVSX, and Zed)"
echo "  3. Zed-only re-publish: git tag zed-v${VERSION} && git push origin zed-v${VERSION}"
