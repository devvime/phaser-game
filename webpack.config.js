const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'game'),
    filename: 'game.bundle.js',
  },
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({ 
    template: './index.template.html', 
    minify: {
      collapseWhitespace: true
    },
    hash: true 
  })],
  devServer: {
    static: {
      directory: path.join(__dirname, 'game'),
    },
    compress: true,
    port: 9000,
  },
};