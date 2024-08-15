import { Settings } from "../../config";
import { TomlParser } from "./TomlParser";

export class CargoTomlParser extends TomlParser {
  constructor() {
    super(Settings.rust.ignoreLinePattern, Settings.rust.enabledLockFile);
  }
}