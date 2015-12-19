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
        test: /head\.load\.js$/,
        include: path.join(__dirname, "vendor"),
        loader: "exports?head"
      },
      {
        test: /LABjs-2\.0\.3/,
        include: path.join(__dirname, "vendor"),
        loader: "exports?$LAB"
      },
      {
        test: /require\.js$/,
        include: path.join(__dirname, "vendor"),
        loader: "exports?requirejs"
      },
      {
        test: /yepnope-2\.0\.0\.js$/,
        include: path.join(__dirname, "vendor"),
        loader: "exports?window.yepnope"
      },
      {
        test: /yui\.js$/,
        include: path.join(__dirname, "vendor"),
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
