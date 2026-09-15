fn main() {
    println!("cargo:rerun-if-changed=bin/dependi-language-server.js");
    println!("cargo:rerun-if-changed=src/lib.rs");
}
