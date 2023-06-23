export const GlobalAPIConfig = Object.freeze({
  API_PREFIX: import.meta.env.VITE_API_PREFIX ?? '',
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD
})
