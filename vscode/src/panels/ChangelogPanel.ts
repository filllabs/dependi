import * as vscode from "vscode";
import { Settings } from "../config";
import { getChangelogPage } from "../webviews/update-page";
import { WebviewPanel } from "./MainPanel";

export class ChangelogPanel extends WebviewPanel {
  private context: vscode.ExtensionContext;

  constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    context: vscode.ExtensionContext,
    version: string
  ) {
    super(panel, extensionUri);
    this.context = context;
    this._panel.webview.html = this.getWebviewContent(version);
  }

  protected getWebviewContent(version: string) {
    const html = this._getHTML(version);
    return html;
  }

  public static render(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
      "changelogDependi",
      "Dependi Changelog",
      vscode.ViewColumn.One,
      {}
    );
    const changelogPanel = new ChangelogPanel(
      panel,
      context.extensionUri,
      context,
      Settings.version
    );
  }

  private _getHTML(version: string) {
    return getChangelogPage(this._panel.webview, this._extensionUri, version);
  }
}
