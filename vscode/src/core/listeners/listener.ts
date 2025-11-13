/**
 * Listener for TOML files.
 * Filters active editor files according to the extension.
 */
import NodeCache from "node-cache";
import { TextEditor } from "vscode";
import { status } from "../../commands/replacers";
import { Settings } from "../../config";
import decorate from "../../ui/decorator";
import Dependency from "../Dependency";
import { CurrentLanguage, Language } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";

export const DependencyCache = new Map<Language, NodeCache>();

export abstract class Listener {
  fetcher: Fetcher;
  parser: Parser;

  constructor(fetcher: Fetcher, parser: Parser) {
    this.fetcher = fetcher;
    this.parser = parser;
  }

  parse(editor: TextEditor): Dependency[] {
    let items = this.parser.parse(editor.document);
    let dependencies = items.map((i) => new Dependency(i));
    // traverse cache and update items of dependencies
    let cache = DependencyCache.get(CurrentLanguage);
    if (!cache) {
      cache = new NodeCache({
        stdTTL: 5 * 60,
        checkperiod: 5 * 30,
        useClones: false,
      });
      DependencyCache.set(CurrentLanguage, cache);
    }
    dependencies = dependencies.map((dep) => {
      let cached = cache.get<Dependency>(
        dep.item.key + dep.item.range.start.line
      );
      if (cached) {
        if (dep.item.value === "latest") {
          dep.item.value = cached.item.latestVersion;
        }
        dep.item.latestVersion = cached.item.latestVersion;
        cached.item = dep.item;
      } else {
        cache.set(dep.item.key + dep.item.range.start.line, dep);
      }
      return cached || dep;
    });

    dependencies.forEach((dep) => {
      dep.versions ? this.modifyDependecy(dep) : dep;
    });

    return dependencies;
  }

  async parseAndDecorate(editor: TextEditor) {
    try {
      // parallel fetch versions
      // create initial fetchedDeps from dependencies
      let dependencies = this.parse(editor);
      const promises: Promise<Dependency[]>[] = [
        this.fetcher.versions(dependencies),
      ];
      // fetch current vulnerabilities depends on check parameter.
      if (Settings.vulnerability.enabled) {
        // fetch vulns for current versions only to quickly show vulnerabilities.
        promises.push(this.fetcher.vulns(dependencies));
      }

      // versions and vulnerabilities of current version.
      await Promise.all(promises);

      // clear replaceAllData set new data
      status.updateAllData = dependencies.map((d) => ({
        key: d.item.key,
        version: this.buildVersionWithPrefix(d),
        startLine: d.item.range.start.line,
      }));

      // parallel fetch vulns for current versions
      decorate(editor, dependencies, CurrentLanguage);

      if (Settings.vulnerability.enabled) {
        // fetch all vulnerabilities since current version to latest version.
        this.fetcher.vulns(dependencies).then(() => {
          decorate(editor, dependencies, CurrentLanguage);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  modifyDependecy(dep: Dependency): void {}
  buildVersionWithPrefix(dependency: Dependency): string {
    const latestVersion = dependency.versions?.[0] ?? "";
    const currentValue = dependency.item.value || "";

    if (currentValue === "*") {
      return "*";
    }

    const prefixMatch = currentValue.match(/^(\^|~|>=|<=|>|<|=)?(.+)$/);
    const prefix = prefixMatch ? prefixMatch[1] : "";
    let version = prefix;
    if (!version) {
      version = latestVersion;
    } else {
      version = prefix + latestVersion;
    }

    return version;
  }
}
