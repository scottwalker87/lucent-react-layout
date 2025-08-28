import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import dts from "rollup-plugin-dts"

export default [
  {
    input: "index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
    external: ["react", "react-dom"]
  },
  {
    input: "index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()]
  }
]
