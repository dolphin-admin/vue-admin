/// <reference types="vite/client" />

/**
 * 环境变量类型
 */
interface ImportMetaEnv {
  readonly VITE_PORT: string
  readonly VITE_BASE_API_PREFIX: string
  readonly VITE_BASE_API_PROXY: string
  readonly VITE_ICON_API_PREFIX: string
  readonly VITE_ICON_API_PROXY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
