export interface ReplaceItem {
  value: string;
  range: {
    start: { line: number; character: number; };
    end: { line: number; character: number; };
  };
}

export const status = {
  inProgress: false,
  replaceItems: [] as ReplaceItem[],
};
