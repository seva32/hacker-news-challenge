const path = require('path');
const merge = require('webpack-merge');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  entry: './src/client/client.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
            },
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtractCssChunks({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = merge(baseConfig, config);
