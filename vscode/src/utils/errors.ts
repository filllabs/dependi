import Item from "../core/Item";
import { Logger } from "../extension";

export function fetcherCatch(item: Item): any {
  return (error: Error) => {
    console.error(error);
    Logger.appendLine("Error fetching versions for " + item.key);
    return {
      item,
      error: item.key + ": " + error,
    };
  };
};


export function listernerCatch(): any {


};