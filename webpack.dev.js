const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');
const webpackMockServer = require("webpack-mock-server");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 4200,
    watchContentBase: true,
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    inline: true,
    before: webpackMockServer.use
  },
});
