import Dependency from "../Dependency";
import { possibleLatestVersion, splitByComma } from "../parsers/PypiParser";
import { Listener } from "./listener";

export class PypiListener extends Listener {


  modifyDependecy(dep: Dependency): void {
    const constrains = splitByComma(dep.item.value ?? "");
    const currVersion = possibleLatestVersion(constrains, dep.versions ?? []);
    dep.item.value = currVersion ? currVersion : dep.item.value;
  }
}
