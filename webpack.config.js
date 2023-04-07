const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'game'),
    filename: 'game.bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      },
      {
        use: ["html-loader"],
        test: /\.html$/i,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
    ]
  },
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
    historyApiFallback: {
      index: 'index.html'
    }
  },
};