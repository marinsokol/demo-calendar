/* eslint-disable */

const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: __dirname + '/src/app.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
    ],
  },
};
