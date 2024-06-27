import * as vscode from "vscode";
import { Settings } from "../config";
import { getWelcomePage } from "../webviews/welcome-page";
import { WebviewPanel } from "./MainPanel";

export class WelcomePagePanel extends WebviewPanel {
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
    const welcomePageHtml = this._getWelcomePageHtml(version);
    return welcomePageHtml;
  }

  public static render(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
      "welcomeDependi",
      "Welcome to Dependi",
      vscode.ViewColumn.One,
      {}
    );
    const welcomePagePanel = new WelcomePagePanel(panel, context.extensionUri, context, Settings.version);
  }


  private _getWelcomePageHtml(version: string) {
    return getWelcomePage(this._panel.webview, this._extensionUri, version);
  }
}
