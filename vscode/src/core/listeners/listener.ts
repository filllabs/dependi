/**
 * Listener for TOML files.
 * Filters active editor files according to the extension.
 */
import NodeCache from "node-cache";
import { TextEditor } from "vscode";
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
  // abstract parseAndDecorate(editor: TextEditor): Promise<void>;

  constructor(fetcher: Fetcher, parser: Parser) {
    this.fetcher = fetcher;
    this.parser = parser;
  }

  // fillCache(lang: Language, deps: Dependency[]) {
  //   let cache = DependencyCache.get(lang);
  //   if (!cache) {
  //     cache = new NodeCache({ stdTTL: 5 * 60, checkperiod: 5 * 30, useClones: false });
  //     DependencyCache.set(lang, cache);
  //   }
  //   deps.forEach(dep => {
  //     if (!dep.item.key) return;
  //     cache.set(dep.item.key, dep);
  //   });
  // }

  parse(editor: TextEditor): Dependency[] {
    let items = this.parser.parse(editor.document);
    let dependencies = items.map((i) => new Dependency(i));
    // traverse cache and update items of dependencies
    let cache = DependencyCache.get(CurrentLanguage);
    if (!cache) {
      cache = new NodeCache({ stdTTL: 5 * 60, checkperiod: 5 * 30, useClones: false });
      DependencyCache.set(CurrentLanguage, cache);
    }
    dependencies = dependencies.map(dep => {
      let cached = cache.get<Dependency>(dep.item.key);
      if (cached) {
        cached.item = dep.item;
      } else {
        cache.set(dep.item.key, dep);
      }
      return cached || dep;
    });

    return dependencies;
  };



  async parseAndDecorate(editor: TextEditor) {
    try {
      // parallel fetch versions
      // create initial fetchedDeps from dependencies
      let dependencies = this.parse(editor);
      const promises: Promise<Dependency[]>[] = [this.fetcher.versions(dependencies)];
      // fetch current vulnerabilities depends on check parameter.
      if (Settings.vulnerability.enabled) {
        // fetch vulns for current versions only to quickly show vulnerabilities.
        promises.push(this.fetcher.vulns(dependencies));
      }

      // versions and vulnerabilities of current version.
      await Promise.all(promises);

      // merge both versions and vulnerabilities
      // if (vulnerabilities) {
      //   versions.forEach((dep, i) => {
      //     dep.vulns = vulnerabilities[i].vulns;
      //   });
      // }

      // this.fillCache(CurrentLanguage, versions);

      // parallel fetch vulns for current versions
      decorate(editor, dependencies, CurrentLanguage);

      if (Settings.vulnerability.enabled) {
        // fetch all vulnerabilities since current version to latest version.
        this.fetcher.vulns(dependencies).then(() => {
          decorate(editor, dependencies, CurrentLanguage);
        });
        // merge vulnData with fetchedDeps set vulns
        // versions.forEach((dep, i) => {
        //   dep.vulns = vulnData[i].vulns;
        // });
        // this.fillCache(CurrentLanguage, versions);
      }

    } catch (e) {
      console.error(e);
    }
  }
}
