import { Errors, getError } from "../../api/index/dependi-index-server/errors";
import { CargoTomlParser } from "../../core/parsers/CargoTomlParser";
import { GoModParser } from "../../core/parsers/GoModParser";
import { NpmParser } from "../../core/parsers/NpmParser";
import { PhpParser } from "../../core/parsers/PhpParser";
import { PypiParser } from "../../core/parsers/PypiParser";
import os from "os";
import { openDeviceLimitDialog, openPaymentRequiredDialog, openSettingsDialog } from "../../ui/dialogs";
import { Configs } from "../../config";
import { RequestState } from "../../api/index/dependi-index-server";
import { window } from "vscode";
import { PyProjectParser } from "../../core/parsers/PyProjectParser";

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
    default:
      throw Error("Language not supported");
  }
}

export const winHelper = (path: string) => {
  if (os.platform() !== "win32") {
    return path;
  }
  let newPath = path.slice(1);
  return newPath = newPath.replace(/\\/g, "/");
}

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