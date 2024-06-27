import * as vscode from "vscode";

export class WebviewPanel {
  protected readonly _panel: vscode.WebviewPanel;
  protected readonly _extensionUri: vscode.Uri;
  protected readonly _disposables: vscode.Disposable[] = [];

  constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  protected _getWebviewContent(): string {
    return "";
  }
}