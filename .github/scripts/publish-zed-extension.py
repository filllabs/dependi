#!/usr/bin/env python3
"""Update a zed-industries/extensions checkout to publish Dependi."""

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


def split_toml_sections(text: str) -> tuple[str, list[str]]:
    parts = re.split(r"(?=^\[)", text, flags=re.M)
    return parts[0], parts[1:]


def sort_toml_sections(sections: list[str]) -> list[str]:
    def key(section: str) -> str:
        match = re.match(r"^\[([^\]]+)\]", section)
        return (match.group(1) if match else section).lower()

    return sorted(sections, key=key)


def update_extensions_toml(path: Path, ext_id: str, version: str) -> str | None:
    text = path.read_text()
    previous: str | None = None
    preamble, sections = split_toml_sections(text)
    section_re = re.compile(rf"^\[{re.escape(ext_id)}\]\n(.*?)(?=\n\[|\Z)", re.S)

    updated: list[str] = []
    found = False
    for section in sections:
        match = section_re.match(section)
        if not match:
            updated.append(section)
            continue
        found = True
        body = match.group(1)
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
        updated.append(f"[{ext_id}]\n{body}")

    if not found:
        updated.append(
            f"[{ext_id}]\n"
            f'submodule = "extensions/{ext_id}"\n'
            f'path = "zed"\n'
            f'version = "{version}"\n'
        )

    out = preamble + "".join(sort_toml_sections(updated))
    if not out.endswith("\n"):
        out += "\n"
    path.write_text(out)
    tomllib.loads(path.read_text())
    return previous


def split_gitmodules(text: str) -> tuple[str, list[str]]:
    parts = re.split(r"(?=^\[submodule )", text, flags=re.M)
    return parts[0], parts[1:]


def sort_gitmodules_sections(sections: list[str]) -> list[str]:
    def key(section: str) -> str:
        match = re.match(r'^\[submodule "([^"]+)"\]', section)
        return (match.group(1) if match else section).lower()

    return sorted(sections, key=key)


def update_gitmodules(path: Path, ext_id: str, source_url: str) -> None:
    header = f'[submodule "extensions/{ext_id}"]'
    gm = path.read_text() if path.exists() else ""
    preamble, sections = split_gitmodules(gm)
    updated: list[str] = []
    found = False
    for section in sections:
        if not section.startswith(header):
            updated.append(section)
            continue
        found = True
        body = section[len(header) :]
        if re.search(r"(?m)^[ \t]*url = ", body):
            body = re.sub(r"(?m)^([ \t]*url = ).*$", rf"\1{source_url}", body, count=1)
        else:
            body = body.rstrip() + f"\n\turl = {source_url}\n"
        if not re.search(r"(?m)^[ \t]*path = ", body):
            body = body.rstrip() + f"\n\tpath = extensions/{ext_id}\n"
        if not body.endswith("\n"):
            body += "\n"
        updated.append(header + body)

    if not found:
        updated.append(
            header
            + "\n"
            + f"\tpath = extensions/{ext_id}\n"
            + f"\turl = {source_url}\n"
        )

    out = preamble + "".join(sort_gitmodules_sections(updated))
    if not out.endswith("\n"):
        out += "\n"
    path.write_text(out)


def stage_submodule_gitlink(ext_id: str, sha: str) -> None:
    """Stage a 160000 gitlink. Do not `git add` this path afterward if the
    worktree has no checkout — that drops the staged gitlink on some git versions.
    """
    path = f"extensions/{ext_id}"
    Path("extensions").mkdir(exist_ok=True)
    subprocess.run(
        ["git", "update-index", "--add", "--cacheinfo", f"160000,{sha},{path}"],
        check=True,
    )
    staged = subprocess.check_output(["git", "ls-files", "-s", "--", path], text=True)
    if not staged.startswith("160000 ") or sha not in staged:
        raise SystemExit(f"Failed to stage submodule gitlink for {path}: {staged!r}")


def main() -> None:
    ext_id, version, source_url, sha = sys.argv[1:5]
    previous = update_extensions_toml(Path("extensions.toml"), ext_id, version)
    update_gitmodules(Path(".gitmodules"), ext_id, source_url)
    stage_submodule_gitlink(ext_id, sha)
    if previous:
        print(f"Updated {ext_id} {previous} -> {version} @ {sha}")
    else:
        print(f"Added {ext_id} {version} @ {sha}")


if __name__ == "__main__":
    main()
