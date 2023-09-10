module.exports = {
  apps: [
    {
      name: 'Dolphin Admin API',
      script: './dist/main.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: 4061,
        FILE_STORAGE_PATH: 'storage'
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 4061,
        FILE_STORAGE_PATH: 'storage'
      }
    }
  ]
}
