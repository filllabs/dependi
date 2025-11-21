import { Listener } from "./listener";
import path from "path";
import { homedir } from "os";
import { promises as async_fs } from 'fs';
import fs from 'fs';
import { AlternateRegistry } from "../AlternateRegistry";
import { TextEditor } from "vscode";
import Dependency from "../Dependency";
import { CratesFetcher } from "../fetchers/CratesFetcher";
import { Settings } from "../../config";
import decorate from "../../ui/decorator";
import { status } from "../../commands/replacers";
import { CurrentLanguage } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";

export class CargoTomlListener extends Listener {
  alternateRegistries: AlternateRegistry[] = [];

  constructor(
    public fetcher: Fetcher,
    public parser: Parser,
  ) {
    super(fetcher, parser);
  } 

  async loadAlternateRegistries(editor: TextEditor) {
    // Parse credentials
    let credentialTokens: AlternateRegistry[] | undefined = undefined;
    try {
      const file = path.join(homedir(), '.cargo', 'credentials.toml');
      if (fs.existsSync(file)) {
        const credentialsTomlContent = await async_fs.readFile(file, 'utf-8');
        credentialTokens = parseAlternateRegistries(credentialsTomlContent);
      }
    } catch (error) {
      console.error(error);
    }

    // Parse alternate registries
    let alternateRegistries: AlternateRegistry[] | undefined = undefined;
    try {
      // Search up from Cargo.toml location
      let currentDir = path.dirname(editor.document.uri.fsPath);
      let foundConfig: string | null = null;
      
      // Search up to 5 levels up
      for (let i = 0; i < 5; i++) {
        const candidateConfig = path.join(currentDir, '.cargo', 'config.toml');
        const candidateLegacy = path.join(currentDir, '.cargo', 'config');
        
        if (fs.existsSync(candidateConfig)) {
          foundConfig = candidateConfig;
          break;
        } else if (fs.existsSync(candidateLegacy)) {
          foundConfig = candidateLegacy;
          break;
        }
        
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
          break;
        }
        currentDir = parentDir;
      }
      
      // Fallback to home directory
      if (!foundConfig) {
        const legacyFile = path.join(homedir(), '.cargo', 'config');
        const file = path.join(homedir(), '.cargo', 'config.toml');
        
        if (fs.existsSync(file)) {
          foundConfig = file;
        } else if (fs.existsSync(legacyFile)) {
          foundConfig = legacyFile;
        }
      }
      
      if (foundConfig) {
        const configTomlContent = await async_fs.readFile(foundConfig, 'utf-8');
        alternateRegistries = parseAlternateRegistries(configTomlContent);
      } 
    } catch (error) {
      console.error(error);
    }

    // Merge credential tokens into registries
    if (alternateRegistries) {
      alternateRegistries = alternateRegistries.map((registry) => {
        if (registry.token === undefined) {
          const token = credentialTokens?.find((credential) => credential.name == registry.name)?.token;
          if (token) {
            registry.token = token;
          }
          return registry;
        } else {
          return registry
        }
      });
      this.alternateRegistries = alternateRegistries;
    }
  }

  async parseAndDecorate(editor: TextEditor) {
    try {
      // Load alternate registries if not already loaded
      if (this.alternateRegistries.length === 0) {
        await this.loadAlternateRegistries(editor);
      }
      
      const allDependencies = this.parse(editor);

      // Split dependencies by registry
      const cratesIoDependencies = allDependencies.filter(
        (d) => !d.item.registry || d.item.registry === "crates-io"
      );
      const alternateDependencies = allDependencies.filter(
        (d) => d.item.registry && d.item.registry !== "crates-io"
      );

      const promises: Promise<Dependency[]>[] = [];
      const isCratesFetcher = this.fetcher instanceof CratesFetcher;

      // Fetch crates.io dependencies
      if (cratesIoDependencies.length > 0) {
        if (isCratesFetcher) {
          // Use direct CratesFetcher
          promises.push(
            (this.fetcher as CratesFetcher).fetchVersionsWithRegistries(
              cratesIoDependencies,
              this.alternateRegistries
            )
          );
          if (Settings.vulnerability.enabled) {
            promises.push(this.fetcher.vulns(cratesIoDependencies));
          }
        } else {
          // Use API fetcher (DependiFetcher - handles vulnerabilities automatically)
          promises.push(this.fetcher.versions(cratesIoDependencies));
        }
      }

      // Fetch alternate registry dependencies (always need CratesFetcher)
      if (alternateDependencies.length > 0) {
        // Create CratesFetcher for alternate registries if using API
        const cratesFetcher = isCratesFetcher 
          ? (this.fetcher as CratesFetcher)
          : new CratesFetcher(Settings.rust.index, "");
        
        promises.push(
          cratesFetcher.fetchVersionsWithRegistries(
            alternateDependencies,
            this.alternateRegistries
          )
        );
        if (Settings.vulnerability.enabled) {
          promises.push(cratesFetcher.vulns(alternateDependencies));
        }
      }

      await Promise.all(promises);

      const dependencies = cratesIoDependencies.concat(alternateDependencies);

      status.updateAllData = dependencies.map((d) => ({
        key: d.item.key,
        version: this.buildVersionWithPrefix(d),
        startLine: d.item.range.start.line,
      }));

      decorate(editor, dependencies, CurrentLanguage);

      // Fetch additional vulnerabilities for direct fetcher (not API)
      if (Settings.vulnerability.enabled && isCratesFetcher) {
        this.fetcher.vulns(dependencies).then(() => {
          decorate(editor, dependencies, CurrentLanguage);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * Parse config.toml to extract alternate registries.
 * @param configTomlContent 
 * @returns 
 */
export function parseAlternateRegistries(configTomlContent: string): AlternateRegistry[] {
  const registries: AlternateRegistry[] = [];
  
  // Simple regex to find [registries.NAME] sections and their keys
  const lines = configTomlContent.split('\n');
  let currentRegistryName: string | null = null;
  let currentRegistryIndex: string | null = null;
  let currentRegistryToken: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('#') || line === '') continue;

    // Check for [registries.name]
    const sectionMatch = line.match(/^\[registries\.(.+?)\]$/);
    if (sectionMatch) {
        if (currentRegistryName) {
            registries.push(new AlternateRegistry(currentRegistryName, currentRegistryIndex || undefined, currentRegistryToken || undefined));
        }
        currentRegistryName = sectionMatch[1];
        currentRegistryIndex = null;
        currentRegistryToken = null;
        continue;
    }
    
    // Check for [registries] table start
    if (currentRegistryName) {
        const indexMatch = line.match(/^index\s*=\s*"(.*?)"/);
        if (indexMatch) {
            currentRegistryIndex = indexMatch[1].replace("sparse+", "");
        }
        const tokenMatch = line.match(/^token\s*=\s*"(.*?)"/);
        if (tokenMatch) {
            currentRegistryToken = tokenMatch[1];
        }
    }
  }
  
  if (currentRegistryName) {
      registries.push(new AlternateRegistry(currentRegistryName, currentRegistryIndex || undefined, currentRegistryToken || undefined));
  }

  return registries;
}
