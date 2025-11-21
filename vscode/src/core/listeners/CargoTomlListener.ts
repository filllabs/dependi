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

export class CargoTomlListener extends Listener {
  alternateRegistries: AlternateRegistry[] = [];

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
      } else {
        console.error('No .cargo/config.toml found');
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
      // create initial fetchedDeps from dependencies
      let dependencies = this.parse(editor);
      const promises: Promise<Dependency[]>[] = [
        (this.fetcher as CratesFetcher).fetchVersionsWithRegistries(dependencies, this.alternateRegistries),
      ];
      
      // fetch current vulnerabilities depends on check parameter.
      if (Settings.vulnerability.enabled) {
        promises.push(this.fetcher.vulns(dependencies));
      }
      await Promise.all(promises);
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
