#!/usr/bin/env python3
"""Update a zed-industries/extensions checkout to publish Dependi.

Follows https://zed.dev/docs/extensions/publishing/publishing-guide:
  git submodule add (HTTPS), pin commit, edit extensions.toml, pnpm sort-extensions.
"""

from __future__ import annotations

import re
import subprocess
import sys
import tomllib
from pathlib import Path


def parse_version(value: str) -> tuple[int, ...]:
    parts: list[int] = []
    for piece in value.split("."):
        digits = "".join(ch for ch in piece if ch.isdigit())
        parts.append(int(digits or "0"))
    return tuple(parts)


def current_version(body: str) -> str | None:
    match = re.search(r'^version = "([^"]+)"', body, re.M)
    return match.group(1) if match else None


def update_extensions_toml(path: Path, ext_id: str, version: str) -> str | None:
    text = path.read_text()
    previous: str | None = None
    match = re.search(rf"(\[{re.escape(ext_id)}\]\n)(.*?)(?=\n\[|\Z)", text, re.S)
    if match:
        body = match.group(2)
        previous = current_version(body)
        if previous and parse_version(version) < parse_version(previous):
            raise SystemExit(
                f"Zed rejects version decreases for '{ext_id}': "
                f"{version} is lower than the registry version {previous}. "
                f"Bump zed/extension.toml (and zed/Cargo.toml) to something greater than {previous}."
            )
        body = re.sub(r'^version = ".*"', f'version = "{version}"', body, count=1, flags=re.M)
        if re.search(r"^path = ", body, re.M):
            body = re.sub(r'^path = ".*"', 'path = "zed"', body, count=1, flags=re.M)
        else:
            body = body.rstrip() + '\npath = "zed"\n'
        if not re.search(r"^submodule = ", body, re.M):
            body = f'submodule = "extensions/{ext_id}"\n' + body
        if not body.endswith("\n"):
            body += "\n"
        text = text[: match.start()] + match.group(1) + body + text[match.end() :]
    else:
        text = (
            text.rstrip()
            + f"\n\n[{ext_id}]\n"
            + f'submodule = "extensions/{ext_id}"\n'
            + 'path = "zed"\n'
            + f'version = "{version}"\n'
        )
    path.write_text(text if text.endswith("\n") else text + "\n")
    tomllib.loads(path.read_text())
    return previous


def ensure_submodule(ext_id: str, source_url: str, sha: str) -> None:
    path = f"extensions/{ext_id}"
    if Path(path).exists() or Path(".gitmodules").read_text(encoding="utf-8", errors="ignore").find(
        f'[submodule "{path}"]'
    ) >= 0:
        subprocess.run(["git", "submodule", "sync", "--", path], check=False)
        subprocess.run(
            ["git", "submodule", "update", "--init", "--depth", "1", "--", path],
            check=True,
        )
    else:
        subprocess.run(
            ["git", "submodule", "add", "--force", source_url, path],
            check=True,
        )

    subprocess.run(["git", "-C", path, "fetch", "--depth", "1", "origin", sha], check=True)
    subprocess.run(["git", "-C", path, "checkout", "--detach", sha], check=True)
    # Register the gitlink at the pinned SHA.
    subprocess.run(["git", "add", path], check=True)


def sort_extensions() -> None:
    """Prefer the official sorter from the extensions repo."""
    if Path("package.json").exists():
        subprocess.run(["pnpm", "install", "--frozen-lockfile"], check=False)
        result = subprocess.run(["pnpm", "sort-extensions"], check=False)
        if result.returncode == 0:
            return
        result = subprocess.run(["npx", "--yes", "pnpm@9", "sort-extensions"], check=False)
        if result.returncode == 0:
            return
    raise SystemExit(
        "Failed to run pnpm sort-extensions. Install pnpm and retry from the extensions repo root."
    )


def main() -> None:
    ext_id, version, source_url, sha = sys.argv[1:5]
    previous = update_extensions_toml(Path("extensions.toml"), ext_id, version)
    ensure_submodule(ext_id, source_url, sha)
    sort_extensions()
    subprocess.run(["git", "add", "extensions.toml", ".gitmodules", f"extensions/{ext_id}"], check=True)
    staged = subprocess.check_output(
        ["git", "ls-files", "-s", "--", f"extensions/{ext_id}"], text=True
    )
    if not staged.startswith("160000 ") or sha not in staged:
        raise SystemExit(f"Submodule gitlink missing or wrong SHA: {staged!r}")
    if previous:
        print(f"Updated {ext_id} {previous} -> {version} @ {sha}")
    else:
        print(f"Added {ext_id} {version} @ {sha}")


if __name__ == "__main__":
    main()
