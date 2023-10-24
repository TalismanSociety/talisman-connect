import dts from "rollup-plugin-dts";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss-modules";
import commonjs from "@rollup/plugin-commonjs";
import svgr from "@svgr/rollup";
import typescript from "@rollup/plugin-typescript";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    plugins: [
      image(),
      postcss(),
      svgr(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: ["react", "@talismn/connect-ui", "@talismn/connect-wallets", "react/jsx-runtime"],
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
    input: "src/index.ts",
    plugins: [dts()],
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
  },
];
