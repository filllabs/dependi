fn main() {
    // Language server JS is downloaded at runtime (not embedded). Keep the
    // committed file in sync for the v{version} download URL and CI checks.
    println!("cargo:rerun-if-changed=bin/dependi-language-server.js");
    println!("cargo:rerun-if-changed=src/lib.rs");
}
