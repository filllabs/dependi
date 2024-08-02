import { Range } from "vscode";

/**
 * Item is a data structure to define parsed items, hierarchy and index.
 */



export default class Item {
  key: string = "";
  value: string | undefined = "";
  start: number = -1;
  end: number = -1;
  line: number = -1;
  endOfLine: number = -1;
  range: Range = new Range(0, 0, 0, 0);
  decoRange: Range = new Range(0, 0, 0, 0);
  constructor(item?: Item) {
    if (item) {
      this.key = item.key;
      this.value = item.value;
      this.start = item.start;
      this.end = item.end;
      this.line = item.line;
      this.decoRange = item.decoRange;
    }
  }
  /**
   * Copy value, start,end ,line from
   */
  copyFrom(key?: string, value?: string, start?: number, end?: number, line?: number, endOfLine?: number) {
    if (key) this.key = key;
    if (value) this.value = value;
    if (start) this.start = start;
    if (end) this.end = end;
    if (line) this.line = line;
    if (endOfLine) this.endOfLine = endOfLine;
  }

  /**Create Range */
  createRange() {
    this.range = new Range(
      this.line,
      this.start,
      this.line,
      this.end
    );
  }
  /**Create Decoration Range */
  createDecoRange() {
    this.decoRange = new Range(
      this.line,
      this.start,
      this.line,
      this.endOfLine
    );
  }

  isValid() {
    return this.key.length > 0 && this.value?.length && this.start > -1 && this.end > -1 && /\d/.test(this.value);
  }
}
