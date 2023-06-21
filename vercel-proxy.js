const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  if (req.url.startsWith('/admin-pc-api')) {
    target = 'http://202.182.125.116:3000'
  }

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/admin-pc-api/': '/'
    }
  })(req, res)
}
