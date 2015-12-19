var webpack = require("webpack");
var path = require("path");

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        // Don't mess with anything in `vendor`, treat it like a script tag.
        include: path.join(__dirname, "vendor"),
        loader: "script"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TEST_LOADER': JSON.stringify(require('./loader-env'))
    })
  ]
};
