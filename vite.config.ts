import { dirname, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { dolphinAdminPresets } from '@dolphin-admin/auto-import'
import { BootstrapAnimation } from '@dolphin-admin/bootstrap-animation'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { ProxyOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import ViteCompression from 'vite-plugin-compression'
import progress from 'vite-plugin-progress'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const {
    VITE_PORT,
    VITE_BASE_API_PREFIX,
    VITE_BASE_API_URL,
    VITE_MOCK_API_PREFIX,
    VITE_MOCK_API_URL
  } = env as ImportMetaEnv

  const port = parseInt(VITE_PORT, 10) || 5173
  const proxy: Record<string, string | ProxyOptions> = {
    [VITE_BASE_API_PREFIX]: {
      target: VITE_BASE_API_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(VITE_BASE_API_PREFIX, '')
    },
    [VITE_MOCK_API_PREFIX]: {
      target: VITE_MOCK_API_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(VITE_MOCK_API_PREFIX, '')
    },
    '/socket.io': {
      target: VITE_BASE_API_URL,
      ws: true,
      changeOrigin: true
    }
  }

  return {
    base: '/',
    plugins: [
      vue(),
      VueI18nPlugin({
        /**
         * i18n 资源预编译
         * @see https://vue-i18n.intlify.dev/guide/advanced/optimization.html
         */
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**')
      }),
      AutoImport({
        dts: '@types/auto-imports.d.ts',
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'pinia',
          'vue-i18n',
          {
            'vue-router': ['RouterLink', 'RouterView'],
            '@vueuse/core': [
              'useDebounceFn',
              'useEventListener',
              'useFullscreen',
              'useMediaQuery',
              'useTitle',
              'useToggle'
            ],
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
              'createDiscreteApi',
              'NButton',
              'NTag',
              'NIcon',
              'NPopconfirm',
              'NInput',
              'NAvatar',
              'NImage',
              'NEllipsis'
            ]
          },
          {
            from: 'naive-ui',
            imports: [
              'DataTableBaseColumn',
              'DataTableColumn',
              'DataTableColumns',
              'DataTableCreateSummary',
              'DropdownOption',
              'FormInst',
              'FormItemInst',
              'FormItemRule',
              'FormRules',
              'FormValidationError',
              'MenuInst',
              'MenuOption',
              'UploadCustomRequestOptions',
              'UploadFileInfo',
              'UploadInst'
            ],
            type: true
          },
          {
            from: '@/constants',
            imports: ['AppMetadata', 'GlobalEnvConfig', 'BasePageModel']
          },
          {
            from: '@/i18n',
            imports: [['default', 'i18n']]
          },
          ...dolphinAdminPresets
        ],
        dirs: ['src/api/**', 'src/hooks/**', 'src/store/**', 'src/utils/**'],
        vueTemplate: true // 支持在 Vue 模版中使用
      }),
      Components({
        dts: '@types/components.d.ts',
        resolvers: [NaiveUiResolver()],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView']
          }
        ],
        directives: true, // 自动导入指令
        globs: ['src/components/*/index.vue', 'src/layouts/*/index.vue', 'src/charts/*/index.vue']
      }),
      Icons({ autoInstall: true }),
      VueDevTools(),
      ViteCompression({
        verbose: true, // 是否在控制台中输出压缩结果
        disable: true,
        threshold: 10240, // 体积过小时不压缩
        algorithm: 'gzip', // 压缩算法
        ext: '.gz',
        deleteOriginFile: true // 源文件压缩后是否删除
      }),
      visualizer({ open: false, gzipSize: true }),
      BootstrapAnimation(),
      progress()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    server: {
      host: true,
      port,
      strictPort: true,
      open: false,
      proxy
    },
    preview: {
      host: true,
      port,
      strictPort: true,
      open: false,
      proxy
    },
    /**
     * Tauri 相关配置
     * @see https://tauri.app/zh-cn/v1/guides/getting-started/setup/vite
     */
    clearScreen: false,
    envPrefix: [
      'VITE_',
      'TAURI_PLATFORM',
      'TAURI_ARCH',
      'TAURI_FAMILY',
      'TAURI_PLATFORM_VERSION',
      'TAURI_PLATFORM_TYPE',
      'TAURI_DEBUG'
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            axios: ['axios'],
            'lodash-es': ['lodash-es'],
            xlsx: ['xlsx'],
            echarts: ['echarts']
          }
        }
      },
      // Tauri 在 Windows 上使用 Chromium，在 macOS 和 Linux 上使用 WebKit
      target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'esnext',
      // 调试构建时禁用压缩
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // 为调试构建生成源代码映射 (sourcemap)
      sourcemap: !!process.env.TAURI_DEBUG
    }
  }
})
