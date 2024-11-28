 import typescript from 'rollup-plugin-typescript';
//import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

const LOCAL_URL = 'http://localhost:4000/';

export default [
  {
    input: 'src/runner/openscad-worker.ts',
    output: {
      file: 'dist/openscad-worker.js',
      format: 'es'
    },
    plugins: [
      typescript({
        rootDir: 'src',
      }),
      replace({
        preventAssignment: true,
        'import.meta.url': JSON.stringify( LOCAL_URL ),
      })
    ]
  },
];