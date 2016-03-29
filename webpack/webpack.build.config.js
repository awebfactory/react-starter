const path = require('path');
const webpack = require('webpack');
//const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  src: path.join(__dirname, '../src'),
  public: path.join(__dirname, '../public')
};

process.env.BABEL_ENV = TARGET;

module.exports = {
  entry: {
    src: path.join(PATHS.src, 'main.js')
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(PATHS.public, 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.src
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.src
      }
    ]
  }
};

