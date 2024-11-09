import dts from 'rollup-plugin-dts';
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import url from "@rollup/plugin-url";

import packageJson from './package.json'

export default [
  {
    input: 'src/index.ts',
    plugins: [
      url(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ]
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{
      file: 'dist/index.d.ts',
      format: 'esm',
    }],
    plugins: [
      dts(),
    ],
  }
]