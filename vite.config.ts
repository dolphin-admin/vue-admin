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
  const { VITE_BASE_API_PREFIX, VITE_BASE_API_PROXY, VITE_PORT, VITE_ICON_API_PREFIX, VITE_ICON_API_PROXY } =
    env as ImportMetaEnv

  const port = parseInt(VITE_PORT, 10)
  const proxy: Record<string, string | ProxyOptions> = {}
  if (VITE_BASE_API_PREFIX && VITE_BASE_API_PROXY) {
    proxy[VITE_BASE_API_PREFIX] = {
      target: VITE_BASE_API_PROXY,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/base-api/, '')
    } as any
  }
  if (VITE_ICON_API_PREFIX && VITE_ICON_API_PROXY) {
    proxy[VITE_ICON_API_PREFIX] = {
      target: VITE_ICON_API_PROXY,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/iconify-api/, '')
    }
  }

  return {
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        dts: './src/auto-imports.d.ts',
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
            '@vueuse/core': ['useToggle', 'useEventListener', 'useDebounceFn', 'useFullscreen'],
            axios: [['default', 'axios']],
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
              'NImage'
            ]
          },
          {
            from: 'naive-ui',
            imports: [
              'FormInst',
              'FormItemInst',
              'FormItemRule',
              'FormRules',
              'DataTableBaseColumn',
              'DataTableColumn',
              'DataTableColumns',
              'UploadFileInfo',
              'UploadInst',
              'UploadCustomRequestOptions'
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
        dts: './src/components.d.ts',
        resolvers: [NaiveUiResolver()],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView']
          }
        ],
        dirs: ['src/components', 'src/layouts', 'src/charts'],
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
    }
  }
})
