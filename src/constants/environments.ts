/**
 * 全局环境变量
 */
export const GlobalEnvConfig = Object.freeze({
  PORT: import.meta.env.VITE_PORT ?? '',
  APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL ?? '',
  BASE_API_PREFIX: import.meta.env.VITE_BASE_API_PREFIX ?? '',
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL ?? '',
  MOCK_API_PREFIX: import.meta.env.VITE_MOCK_API_PREFIX ?? '',
  MOCK_API_URL: import.meta.env.VITE_MOCK_API_URL ?? '',
  GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID ?? '',
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '',
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD
})
