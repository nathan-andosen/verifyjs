var webpack = require("webpack");
var path = require('path');
var version = require('./package.json').version;

var banner = 'verifyjs v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' Nathan Anderson';

module.exports = {
  entry: {
    "Verify" : "./src/index.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "verify.min.js",
    library: ["Thenja"],
    libraryTarget: 'umd'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' }
    ]
  }
};


if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin(banner),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
