var path = require('path');
var HtmlWebpackPlugin = require('webpack-html-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
  devtool: "source-map",
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    //publicPath: '/dist',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: 'file-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.css/, loader: ExtractTextPlugin.extract("css")},
      { test: /\.scss$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]}
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new CopyWebpackPlugin([
            { from: './src/icons', to: 'icons' }
        ]),
    new ExtractTextPlugin("styles.css")
  ]
};
