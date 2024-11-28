import { MergedOutputs } from "./openscad-worker";

const ignoredLogs = new Set([
  'Could not initialize localization.'
]);

type MergedOutputsOptions = {
  shiftSourceLines?: {
    sourcePath: string,
    skipLines: number,
  }
}
export const processMergedOutputs = (outputs: MergedOutputs, opts: MergedOutputsOptions) => ({
  logText: joinMergedOutputs(outputs, opts),
});

export function joinMergedOutputs(mergedOutputs: MergedOutputs, opts: MergedOutputsOptions) {
  let allLines = [];
  for (const {stderr, stdout, error} of mergedOutputs){
    const line = stderr ?? stdout ?? `EXCEPTION: ${error}`;
    if (ignoredLogs.has(line)) {
      continue;
    }
    allLines.push(line);
  }

  return allLines.join("\n");
}

