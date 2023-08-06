import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { ProxyOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_BASE_API_PROXY, VITE_PORT } = env as ImportMetaEnv

  const port = parseInt(VITE_PORT, 10)
  const proxy: Record<string, string | ProxyOptions> = {
    '/socket.io': {
      target: VITE_BASE_API_PROXY,
      ws: true,
      changeOrigin: true
    },
    '/base-api': {
      target: VITE_BASE_API_PROXY,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/base-api/, '')
    }
  }

  return {
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        dts: './src/types/auto-imports.d.ts',
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
            axios: [['default', 'axios']],
            dayjs: [['default', 'dayjs']],
            d3: [['*', 'd3']],
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
            imports: ['siteMetaData', 'GlobalEnvConfig', 'BasePageModel']
          },
          {
            from: '@/i18n',
            imports: [['default', 'i18n']]
          }
        ],
        dirs: ['src/api', 'src/hooks', 'src/store', 'src/tools', 'src/utils']
      }),
      Components({
        dts: './src/types/components.d.ts',
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
      Icons({ autoInstall: true })
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
    },
    build: {
      rollupOptions: {
        external: ['d3']
      }
    }
  }
})
