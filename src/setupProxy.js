const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://cfmpcolk2k.execute-api.af-south-1.amazonaws.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};
