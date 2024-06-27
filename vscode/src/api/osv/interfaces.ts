export interface Vulnerability {
  id : string;
}

export interface VersionVulnerabilities {
  vulnerabilities: Vulnerability[];
  version: string;
}

export interface PackageVersionVulnerabilities {
  packageName: string;
  versionVulnerabilities: VersionVulnerabilities[];
}

// queries
export interface VulnerabilityQuery {
  version: string | undefined;
  package: VulnerabilityQueryPackageInfo;
}

export interface PackageVulnerabilityQueries {
  queries: VulnerabilityQuery[];
}

interface VulnerabilityQueryPackageInfo {
  name: string;
  ecosystem: string;
}

// results
export interface VersionVulnerabilityResult {
  version: string;
  vulns: Vulnerability[];
  next_page_token?: string;
  packageName: string;
}

export interface PackageVulnerabilityResults {
  results: VersionVulnerabilityResult[];
}

export interface AllPackageVulnerabilityResult {
  results: VersionVulnerabilityResult[];
}

// Single Query Interfaces

export interface VulnerabilityResult {
  packageName: string;
  version: string;
  vulns: VulnerabilityDetails[];
}

export interface VulnerabilityDetails {
  id: string;
  summary: string;
  details: string;
  aliases: string[];
  modified: string;
  published: string;
  database_specific?: Speficiation;
  ecosystem_specific?: Speficiation;
  affected?: Affected[];
  severity: Severity[];
}


interface Speficiation {
  severity?: string;
}

interface Affected {
  package: VulnerabilityQueryPackageInfo;
  ranges: Range[];
}

interface Range {
  events : Event[]
}

interface Event {
  introduced?: string;
  fixed?: string;
}

interface Severity {
  type: string;
  score: string;
}
