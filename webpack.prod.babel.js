const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: './dev/js/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    output: {
      path: 'src',
      filename: 'js/bundle.min.js'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          REACT_API_KEY: JSON.stringify(process.env.REACT_API_KEY),
          REACT_AUTH_DOMAIN: JSON.stringify(process.env.REACT_AUTH_DOMAIN),
          REACT_DATABASE_URL: JSON.stringify(process.env.REACT_DATABASE_URL),
          REACT_STORAGE_BUCKET: JSON.stringify(process.env.REACT_STORAGE_BUCKET),
          REACT_SENDER_ID: JSON.stringify(process.env.REACT_SENDER_ID),
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
};
