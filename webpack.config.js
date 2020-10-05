/* eslint-disable new-cap */
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    content: './src/contents/content.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: ['es2015'],
        },
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            {
              source: 'manifest.json',
              destination: path.join(__dirname, 'dist/manifest.json'),
            },
            {
              source: 'images',
              destination: path.join(__dirname, 'dist/images'),
            },
          ],
        },
      ],
    }),
  ],
};
