import * as esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const shims = path.join(dir, "src/shims");

function fromVsCodeSrc(importer = "") {
  return importer.replaceAll("\\", "/").includes("/vscode/src/");
}

await esbuild.build({
  entryPoints: [path.join(dir, "src/index.ts")],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node18",
  outfile: path.join(dir, "../bin/dependi-language-server.js"),
  sourcemap: false,
  banner: { js: "#!/usr/bin/env node" },
  logLevel: "info",
  plugins: [
    {
      name: "dependi-shims",
      setup(build) {
        build.onResolve({ filter: /^vscode$/ }, () => ({
          path: path.join(shims, "vscode.ts"),
        }));

        build.onResolve({ filter: /.*/ }, (args) => {
          if (!fromVsCodeSrc(args.importer)) {
            return;
          }
          const specifier = args.path.replaceAll("\\", "/");
          if (
            specifier === "../extension" ||
            specifier === "../../extension" ||
            specifier.endsWith("/extension")
          ) {
            return { path: path.join(shims, "logger.ts") };
          }
          if (
            specifier === "../../git" ||
            specifier === "../git" ||
            specifier === "./git" ||
            specifier === "../../api/git" ||
            specifier === "../api/git" ||
            specifier.endsWith("/api/git")
          ) {
            return { path: path.join(shims, "git.ts") };
          }
        });
      },
    },
  ],
});
