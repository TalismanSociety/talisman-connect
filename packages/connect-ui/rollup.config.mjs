import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss-modules";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import esbuild from 'rollup-plugin-esbuild'

import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";  

import packageJson from "./package.json" assert { type: "json" }


export default [
  {
    input: "src/index.ts",
    plugins: [
      esbuild(),
      svgr(),
      url(),
      postcss(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" })
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm",
      },
    ],
    plugins: [dts()],
  },
];
