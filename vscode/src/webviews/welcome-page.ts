import { readFileSync } from "fs";
import { Uri, Webview } from "vscode";

export function getWelcomePage(
  webview: Webview,
  extensionUri: Uri,
  version: string
): string {
  const onDiskPath = Uri.joinPath(extensionUri, "icon.png");
  const logo = webview.asWebviewUri(onDiskPath);
  const changelogPath = Uri.joinPath(extensionUri, "CHANGELOG.md");
  const changelogMD = readFileSync(changelogPath.fsPath, "utf8");
  const changelogHTML = markdownToHTML(changelogMD, "0.5.3");
  const stylePath = Uri.joinPath(
    extensionUri,
    "templates",
    "welcome-page",
    "style.css"
  );
  const featuresPath = Uri.joinPath(
    extensionUri,
    "templates",
    "welcome-page",
    "features.html"
  );
  const styleUri = webview.asWebviewUri(stylePath);
  const featuresHTML = readFileSync(featuresPath.fsPath, "utf8");

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
         
          <p>Welcome to <b>Dependi</b>. Empowers developers to efficiently manage dependencies and address vulnerabilities in Rust, Go, JavaScript, and Python projects.</p>
          </div>
    </div>
    <div class="split">
      <div class="features">
          <h1>Features</h1>   
          ${featuresHTML}
      </div>
      <div class="changelog" >
          ${changelogHTML}
      </div>
    </div>
  
  </body>
  </html>`;
}

function markdownToHTML(markdown: string, version: string): string {
  let html = markdown.split(`## ${version}`)[0];

  // Convert links to HTML
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert headings to HTML"
  html = html.replace(/^#\s(.*)$/gm, "<h1>$1</h1>");
  html = html.replace(/^##\s(.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^###\s(.*)$/gm, "<h4>$1</h4>");
  return html;
}
