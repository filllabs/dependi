import Item from "../Item";
import { JsonParser } from "./JsonParser";

export class NpmParser extends JsonParser {
	constructor() {
		super('dependencies', 'devDependencies')
	}

  addDependency(item: Item) {
    if (item.value?.startsWith('link:')) {
      return
    }
    item = convertAliasToPackageName(item);
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
}

function convertAliasToPackageName(item: Item): Item {
  if (item.value?.startsWith("npm:")) {
    const atSymbolIndex = item.value.indexOf('@');
    if (atSymbolIndex !== -1) {
      item.key = item.value.slice(4, atSymbolIndex);
      item.value = item.value.slice(atSymbolIndex + 1);
      item.start = item.start + item.key.length + 5;
    }
  }
  return item
}
