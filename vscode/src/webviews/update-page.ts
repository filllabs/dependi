import { readFileSync } from "fs";
import { Uri, Webview } from "vscode";
import { markdownToHTML } from "./utils";

export function getChangelogPage(
  webview: Webview,
  extensionUri: Uri,
  version: string
): string {
  const onDiskPath = Uri.joinPath(extensionUri, "icon.png");
  const logo = webview.asWebviewUri(onDiskPath);
  const changelogPath = Uri.joinPath(extensionUri, "CHANGELOG.md");
  const changelogMD = readFileSync(changelogPath.fsPath, "utf8");
  const changelogHTML = markdownToHTML(changelogMD);
  const stylePath = Uri.joinPath(
    extensionUri,
    "templates",
    "welcome-page",
    "style.css"
  );

  const styleUri = webview.asWebviewUri(stylePath);

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" type="text/css" href="${styleUri}">
          <title>Welcome to Dependi</title>
        </head>
          
          <body>
          <div class="header">
          <div class="logo">
          <img src="${logo}" alt="logo" width="128" height="128">
          </div>
          <div class="logo-header">
          <h1>Dependi <em>v${version}</em> </h1>
         
          <p>Welcome to <b>Dependi</b>. Empowers developers to efficiently manage dependencies and address vulnerabilities in Rust, Go, JavaScript, TypeScript, Python and PHP projects.</p>
          </div>
    </div>
    <p>  Don\`t forget that a <b><a href="https://www.dependi.io/#pricing" class="cta">Free trial</a> of PRO</b> is waiting for you.
      <div class="changelog" >
          ${changelogHTML}
      </div>
    </p>
  </body>
  </html>`;
}
