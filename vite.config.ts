import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", // 应用的路径
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  esbuild: {
    drop: ["console", "debugger"]
  },
  server: {
    host: true,
    port: 5173, // 应用端口号
    strictPort: true, // 端口被占用时，终止应用服务
    open: false, // 是否自动打开浏览器，如果是字符串，则会被当作 URL 的路径名
    proxy: {
      "/api-prefix": {
        target: "localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-prefix/, "")
      }
    }
  }
})
