/**
 * Represents information about a dependency.
 */
export type DependencyInfo = {
    /**
     * The name of the dependency.
     */
    name: string,

    /**
     * The versions of the dependency available.
     */
    versions: Array<string>,

    /**
     * Optional features that the package supports (for Crates).
     */
    features?: Array<string>;

    /**
     * Optional latest version of the dependency.
     */
    latestVersion?: string;

    /**
     * Optional error message.
     */
    error?: string;
};
