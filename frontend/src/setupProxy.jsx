const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Add your proxy configuration here
  app.use(
    '/api', // The path to proxy (change this to match your API routes)
    createProxyMiddleware({
      target: 'http://localhost:5000', // The URL of your Flask API
      changeOrigin: true,
    })
  );
};
