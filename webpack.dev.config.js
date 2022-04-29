const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.js');

module.exports = merge(commonConfig, {
  devServer: {
    static: './dist',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000/',
    },
  },
});
