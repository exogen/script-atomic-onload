var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    noParse: [
      path.join(__dirname, 'vendor')
    ],
    rules: [
      {
        include: path.join(__dirname, 'vendor'),
        loader: 'imports-loader?this=>window'
      },
      {
        include: require.resolve('./vendor/curl-with-js-domReady-legacy'),
        loader: 'script-loader'
      },
      {
        test: require.resolve('./vendor/head.load'),
        loader: 'exports-loader?head'
      },
      {
        test: require.resolve('./vendor/jsl.min'),
        loader: 'exports-loader?jsl'
      },
      {
        test: require.resolve('./vendor/l'),
        loader: 'exports-loader?ljs'
      },
      {
        test: require.resolve('./vendor/LABjs-2.0.3/LAB'),
        loader: 'exports-loader?$LAB'
      },
      {
        test: require.resolve('./vendor/lazyload'),
        loader: 'exports-loader?LazyLoad'
      },
      {
        test: require.resolve('./vendor/loadrunner'),
        loader: 'exports-loader?using'
      },
      {
        test: require.resolve('./vendor/nbl'),
        loader: 'exports-loader?nbl'
      },
      {
        test: require.resolve('./vendor/require'),
        loader: 'exports-loader?requirejs'
      },
      {
        test: require.resolve('scriptinclude'),
        loader: 'exports-loader?include'
      },
      {
        test: require.resolve('./vendor/yepnope-2.0.0'),
        loader: 'exports-loader?yepnope'
      },
      {
        test: require.resolve('./vendor/yui'),
        loader: 'exports-loader?YUI'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TEST_LOADER': JSON.stringify(require('./loader-env'))
    })
  ]
};
