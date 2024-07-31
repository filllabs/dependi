import Dependency from "../../core/Dependency";

export interface ItemRange {
  start: { line: number; character: number; };
  end: { line: number; character: number; };
}

export interface ReplaceItem {
  value: string;
  range: ItemRange;
}

export interface CommandData {
  key: string;
  version: string;
}

export const status = {
  inProgress: false,
  replaceItems: [] as ReplaceItem[],
  dataIndex: {} as Record<string, Dependency>,
};
