export const Logger = {
  name: "Dependi",
  append: (value: string) => process.stderr.write(value),
  appendLine: (value: string) => process.stderr.write(value + "\n"),
  clear: () => {},
  show: () => {},
  hide: () => {},
  dispose: () => {},
  replace: () => {},
};

export function activate(): void {}
export function deactivate(): void {}
