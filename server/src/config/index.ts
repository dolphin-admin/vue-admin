export const GlobalConfig = Object.freeze({
  IS_PROD: process.env.NODE_ENV === 'production',

  FILE_STORAGE_PATH: process.env.FILE_STORAGE_PATH || 'storage'
})
