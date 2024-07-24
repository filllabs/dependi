import { ExtensionContext, ProgressLocation, commands, window } from "vscode";
import { Configs } from "../../config";
import { generateCurrentReport } from "./reportGenerator";
import { VulnerabilityReportPanel } from "../../panels/VulnerabilityReportPanel";

/**
 * 
 * @param context 
 * Generate the vulnerability report for the current repository and active file. Creates a WebView panel to display the report.
 * @returns 
 */
export const generateCurrentVulnReport = (context: ExtensionContext) =>
  commands.registerCommand(Configs.GENERATE_VULNERABILITY_CURRENT_REPORT, async () => {
    const progressOptions = {
      location: ProgressLocation.Notification,
      title: "Loading Report",
      cancellable: false,
    };

    window.withProgress(progressOptions, generateCurrentReport).then(
      (fetchedHTML) => {
        if (!fetchedHTML) {
          return;
        }
        VulnerabilityReportPanel.render(context.extensionUri, fetchedHTML);
      },
      (error) => {
        window.showErrorMessage(`Report generation failed: ${error}`);
      }
    );
  });
