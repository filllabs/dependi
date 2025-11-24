import { Settings } from "../../config";
import { TomlParser } from "./TomlParser";
import { AlternateRegistry } from "../AlternateRegistry";

export class CargoTomlParser extends TomlParser {
  constructor() {
    super(Settings.rust.ignoreLinePattern, Settings.rust.lockFileEnabled);
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