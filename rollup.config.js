import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import dts from "rollup-plugin-dts"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"

export default [
  {
    input: "src/index.ts",
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
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"]
      }),
      commonjs(),
      postcss({
        modules: {
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        },
        inject: true,
        extract: false,
        plugins: [postcssImport()],
        onExtract: false
      }),
      typescript({ tsconfig: "./tsconfig.json" })
    ],
    external: ["react", "react-dom"]
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: ".",
          paths: {
            "#/*": ["src/*"],
            "#structure/*": ["src/structure/*"],
            "#lib/*": ["src/lib/*"],
            "#ui/*": ["src/ui/*"],
            "#style/*": ["src/style/*"]
          }
        }
      })
    ]
  }
]
