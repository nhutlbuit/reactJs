
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/trainingApi',
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
      secure: false
    })
  );
};