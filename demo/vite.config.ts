import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      // "@scottwalker/lucent": path.resolve(__dirname, "../src")
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
})
