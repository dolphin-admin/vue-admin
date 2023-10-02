import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { ProxyOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const {
    VITE_BASE_API_PROXY,
    VITE_MOCK_API_PROXY,
    VITE_PORT,
    VITE_BASE_API_V2_PROXY
  } = env as ImportMetaEnv

  const port = parseInt(VITE_PORT, 10) || 5173
  const proxy: Record<string, string | ProxyOptions> = {
    '/base-api': {
      target: VITE_BASE_API_PROXY,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/base-api/, '')
    },
    '/base-api-v2': {
      target: VITE_BASE_API_V2_PROXY,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/base-api-v2/, '')
    },
    '/mock-api': {
      target: VITE_MOCK_API_PROXY,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/mock-api/, '')
    },
    '/socket.io': {
      target: VITE_BASE_API_PROXY,
      ws: true,
      changeOrigin: true
    }
  }

  return {
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        dts: true,
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
            imports: ['AppConfig', 'GlobalEnvConfig', 'BasePageModel']
          },
          {
            from: '@/i18n',
            imports: [['default', 'i18n']]
          }
        ],
        dirs: ['src/api', 'src/hooks', 'src/store', 'src/tools', 'src/utils']
      }),
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView']
          }
        ],
        dirs: ['src/components', 'src/layouts', 'src/providers', 'src/charts'],
        extensions: ['vue']
      }),
      Icons({ autoInstall: true }),
      VueDevTools()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        /**
         * NOTE: Fix vue-i18n loader bug
         * @see https://github.com/intlify/vue-i18n-next/issues/789
         */
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
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
    }
  }
})
