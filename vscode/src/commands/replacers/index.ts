

export interface CommandData {
  key: string;
  version: string;
}

export const status = {
  inProgress: false,
  updateAllData: [] as CommandData[],
};
