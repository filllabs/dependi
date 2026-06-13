/** Returns true when a Cargo.toml version requirement is an exact pin (=X.Y.Z). */
export function isPinnedCargoVersion(version?: string): boolean {
  return !!version?.trimStart().startsWith("=");
}
