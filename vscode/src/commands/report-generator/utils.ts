import os from "os";
import { window } from "vscode";
import { RequestState } from "../../api/indexes/dependi";
import { Errors, getError } from "../../api/indexes/dependi/errors";
import { Configs } from "../../config";
import { CargoTomlParser } from "../../core/parsers/CargoTomlParser";
import { GoModParser } from "../../core/parsers/GoModParser";
import { NpmParser } from "../../core/parsers/PackageJsonParser";
import { PhpParser } from "../../core/parsers/ComposerJsonParser";
import { PypiParser } from "../../core/parsers/PypiParser";
import { PyProjectParser } from "../../core/parsers/PyProjectParser";
import { openDeviceLimitDialog, openPaymentRequiredDialog, openSettingsDialog } from "../../ui/dialogs";
import { PubspecParser } from "../../core/parsers/PubspecParser";
import { CsprojParser } from "../../core/parsers/CsprojParser";

export const parserInvoker = (language: string) => {
  switch (language) {
    case "Cargo.toml":
      return new CargoTomlParser();
    case "go.mod":
      return new GoModParser();
    case "package.json":
      return new NpmParser();
    case "composer.json":
      return new PhpParser();
    case "requirements.txt":
      return new PypiParser();
    case "pyproject.toml":
      return new PyProjectParser();
    case "pubspec.yaml":
      return new PubspecParser();
    case "Directory.Build.props":
    case "Directory.Packages.props":
      return new CsprojParser();
    default:
      // Check if it's a .csproj file
      if (language.endsWith(".csproj")) {
        return new CsprojParser();
      }
      throw Error("Language not supported");
  }
};

export const winHelper = (path: string) => {
  if (os.platform() !== "win32") {
    return path;
  }
  let newPath = path.slice(1);
  return newPath = newPath.replace(/\\/g, "/");
};

export function handleReportError(reportResp: RequestState<string>) {
  if (reportResp.status !== 200) {
    switch (getError(reportResp.error)) {
      case Errors.DLR:
        openDeviceLimitDialog();
        break;
      case Errors.PAYRQ:
        openPaymentRequiredDialog();
        break;
      case Errors.UNAUTH:
        openSettingsDialog(Configs.INDEX_SERVER_API_KEY, "Unauthorized, please check your api key.");
        break;
      case Errors.IVAK:
        openSettingsDialog(Configs.INDEX_SERVER_API_KEY, "Invalid api key or api key not found. Please check your api key.");
        break;
      case Errors.UINA:
        openSettingsDialog(Configs.INDEX_SERVER_API_KEY, "User is not active. Please check emails from us or visit dependi.io dashboard.");
        break;
      default:
        window.showErrorMessage(getError(reportResp.error));
    }
  }
}