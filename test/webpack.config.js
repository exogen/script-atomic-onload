var webpack = require("webpack");
var path = require("path");

module.exports = {
  devtool: 'inline-source-map',
  module: {
    noParse: [
      path.join(__dirname, "vendor")
    ],
    loaders: [
      {
        include: path.join(__dirname, "vendor"),
        loader: "imports?this=>window"
      },
      {
        include: require.resolve("./vendor/curl-with-js-domReady-legacy"),
        loader: "script"
      },
      {
        test: require.resolve("./vendor/head.load"),
        loader: "exports?head"
      },
      {
        test: require.resolve("./vendor/jsl.min"),
        loader: "exports?jsl"
      },
      {
        test: require.resolve("./vendor/l"),
        loader: "exports?ljs"
      },
      {
        test: require.resolve("./vendor/LABjs-2.0.3/LAB"),
        loader: "exports?$LAB"
      },
      {
        test: require.resolve("./vendor/lazyload"),
        loader: "exports?LazyLoad"
      },
      {
        test: require.resolve("./vendor/loadrunner"),
        loader: "exports?using"
      },
      {
        test: require.resolve("./vendor/nbl"),
        loader: "exports?nbl"
      },
      {
        test: require.resolve("./vendor/require"),
        loader: "exports?requirejs"
      },
      {
        test: require.resolve("scriptinclude"),
        loader: "exports?include"
      },
      {
        test: require.resolve("./vendor/yepnope-2.0.0"),
        loader: "exports?yepnope"
      },
      {
        test: require.resolve("./vendor/yui"),
        loader: "exports?YUI"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TEST_LOADER': JSON.stringify(require('./loader-env'))
    })
  ]
};
