import Item from "../Item";
import { JsonParser } from "./JsonParser";

export class PhpParser extends JsonParser {
  constructor() {
    super('require', 'require-dev')
  }

  addDependency(item: Item) {
    // `php` is a special value, which is not a dependency but a restriction
    // on the php version (like `engine` in package.json)
    if (item.key === 'php') {
      return
    }
    
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
}
