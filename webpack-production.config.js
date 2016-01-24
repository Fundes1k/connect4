var path = require('path');
var webpack = require('webpack');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');

module.exports = {
  devtool: 'eval',
  node: {
    fs: "empty"
  },
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
   extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.json', 'index.json'],
   modulesDirectories: ['web_modules', 'bower_components', 'node_modules'],

  },
  plugins: [
    new WebpackErrorNotificationPlugin(/* strategy */),
    new webpack.HotModuleReplacementPlugin(),
    new NyanProgressPlugin(
      {
        restoreCursorPosition: true,
        nyanCatSays: function(progress, messages) {
          if(progress == 1)
            return 'go deploy'
          else
            return 'buildeando... '+(progress*100).toFixed(2)+' %'
        }
      }
    )
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
      exclude: path.join(__dirname, 'node_modules')
    },
    { test: /\.json$/, loader: 'json', include: path.join(__dirname, 'node_modules', 'pixi.js'),}
  ]

  }
};
