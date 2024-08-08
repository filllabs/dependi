

export interface CommandData {
  key: string;
  version: string;
  startLine: number;
}

export const status = {
  inProgress: false,
  updateAllData: [] as CommandData[],
};
