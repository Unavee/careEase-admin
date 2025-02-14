const path = require('path');

module.exports = function override(config) {
  // Modify the Webpack resolve.fallback to polyfill missing Node modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'),
    http: require.resolve('stream-http'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    fs: false,  // Only if you don't need `fs` in the browser
    net: false,
    querystring: require.resolve('querystring-es3'),
    zlib: require.resolve('browserify-zlib'),  // Add this line for zlib
  };

  // Add alias to resolve '@' to 'src'
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),  // Ensure 'src' is the root for '@' alias
  };

  return config;
};
