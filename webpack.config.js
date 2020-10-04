var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    content: './src/contents/content.js',
  },
  output: {
    filename: '[name].js',
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
};
