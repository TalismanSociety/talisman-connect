import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss-modules";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import svg from "rollup-plugin-svg";
import url from "@rollup/plugin-url";
import styles from "rollup-plugin-styles";
import svgr from "@svgr/rollup";

import packageJson from "./package.json";

// export default [
//   {
//     input: 'src/index.ts',
//     plugins: [
//       commonjs(),
//       image(),
//       nodeResolve(),
//       postcss(),
//       svgr(),
//     ],
//     output: [
//       {
//         file: 'dist/index.js',
//         format: 'cjs',
//         exports: 'default',
//       },
//     ]
//   },
//   {
//     input: 'src/index.ts',
//     plugins: [
//       dts(),
//     ],
//     output: {
//       file: 'dist/index.d.ts',
//       format: 'es',
//     },
//   }
// ]

export default [
  {
    input: "src/index.ts",
    plugins: [
      // esbuild(),
      svgr(),
      url(),

      // image(),
      //styles(),

      postcss(),
      //
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
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
