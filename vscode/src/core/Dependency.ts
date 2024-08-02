import Item from "./Item";

/**
 * Dependency is a data structure to define parsed dependency index, versions and error
 */
export default class Dependency {
  item: Item;
  versions?: Array<string>;
  vulns?: Map<string, string[]>;
  error?: string;

  constructor(item: Item) {
    this.item = item;
  }
}
