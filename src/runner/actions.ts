// Portions of this file are Copyright 2021 Google LLC, and licensed under GPL2+. See COPYING.

import { spawnOpenSCAD } from "./openscad-runner";
import { processMergedOutputs } from "./output-parser";

export type RenderOutput = {stlFile: File, logText: string, elapsedMillis: number}


export type RenderArgs = {
  source: string,
  sourcePath: string,
  vars?: {[name: string]: any},
  features?: string[],
  extraArgs?: string[],
  isPreview: boolean,
  svgFile?: string
}

function formatValue(any: any): string {
  if (typeof any === 'string') {
    return `"${any}"`;
  } else if (any instanceof Array) {
    return `[${any.map(formatValue).join(', ')}]`;
  } else {
    return `${any}`;
  }
}

export function render({sourcePath, source, isPreview, vars, features, extraArgs, svgFile}: RenderArgs)  {

    const prefixLines: string[] = [];
    if (isPreview) {
      prefixLines.push('$preview=true;');
    }
    source = [...prefixLines, source].join('\n');

    const args = [
      sourcePath,
      "-o", "out.stl",
      "--export-format=binstl",
      ...(Object.entries(vars ?? {}).flatMap(([k, v]) => [`-D${k}=${formatValue(v)}`])),
      ...(features ?? []).map(f => `--enable=${f}`),
      ...(extraArgs ?? [])
    ]
    
    const job = spawnOpenSCAD({
      // wasmMemory,
      inputs: [[sourcePath, source]],
      args,
      outputPaths: ['out.stl'],
      svgFile
      // workingDir: sourcePath.startsWith('/') ? getParentDir(sourcePath) : '/home'
    });

    return new Promise<RenderOutput>((resolve, reject) => {
      (async () => {
        try {
          const result = await job;
          console.log(result);

          const {logText} = processMergedOutputs(result.mergedOutputs, {
            shiftSourceLines: {
              sourcePath: sourcePath,
              skipLines: prefixLines.length
            }
          });
    
          if (result.error) {
            reject(result.error);
          }
          
          const [output] = result.outputs ?? [];
          if (!output) {
            reject(new Error('No output from runner!'));
            return;
          }
          const [filePath, content] = output;
          const filePathFragments = filePath.split('/');
          const fileName = filePathFragments[filePathFragments.length - 1];

          // TODO: have the runner accept and return files.
          const blob = new Blob([content], { type: "application/octet-stream" });
          // console.log(new TextDecoder().decode(content));
          const stlFile = new File([blob], fileName);
          resolve({stlFile, logText, elapsedMillis: result.elapsedMillis});
        } catch (e) {
          console.error(e);
          reject(e);
        }
      })();
    });
  };
