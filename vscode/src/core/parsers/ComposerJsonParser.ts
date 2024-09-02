import { Settings } from "../../config";
import Item from "../Item";
import { JsonParser } from "./JsonParser";
import { ComposerLockParser } from "./ComposerLockParser";

export class PhpParser extends JsonParser {
  constructor() {
    super(
      ["require", "require-dev"],
      Settings.php.lockFileEnabled,
      "composer.lock",
      new ComposerLockParser(),
    );
  }

  addDependency(item: Item) {
    // `php` is a special value, which is not a dependency but a restriction
    // on the php version (like `engine` in package.json)
    if (item.key === "php") {
      return;
    }

    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
}
