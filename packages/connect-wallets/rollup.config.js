import dts from 'rollup-plugin-dts';
// import esbuild from 'rollup-plugin-esbuild';
// import image from '@rollup/plugin-image';
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import svg from "rollup-plugin-svg";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";

import packageJson from './package.json'

export default [
  {
    input: 'src/index.ts',
    plugins: [
      // esbuild(),
      url(),
      svgr(),
      // image(),
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