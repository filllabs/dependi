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
    
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
}
