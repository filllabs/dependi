import { CargoTomlParser } from "../../core/parsers/CargoTomlParser";
import { GoModParser } from "../../core/parsers/GoModParser";
import { NpmParser } from "../../core/parsers/NpmParser";
import { PypiParser } from "../../core/parsers/PypiParser";
import os from "os";

export const parserInvoker = (language: string) => {
  switch (language) {
    case "Cargo.toml":
      return new CargoTomlParser();
    case "go.mod":
      return new GoModParser();
    case "package.json":
      return new NpmParser();
    case "requirements.txt":
      return new PypiParser();
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