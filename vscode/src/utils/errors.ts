import Dependency from "../core/Dependency";
import { Logger } from "../extension";

export function fetcherCatch(dep: Dependency): any {
  return (error: Error) => {
    console.error(error);
    Logger.appendLine("Error fetching versions for " + dep.item.key + ": " + error);
    return {
      item: dep,
      error: dep.item.key + ": " + error,
    };
  };
};


