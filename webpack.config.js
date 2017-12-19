/*global module*/

var glob = require("glob");
var path = require("path")
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var fs = require('fs');
if (fs.existsSync(".babelrc") == false) {
    fs.writeFileSync(".babelrc", '{ "presets": ["es2015", "stage-3"] }')
}

var files = glob.sync('./src/*.js');
var entry = {};

files.forEach(function(f){
   var name = /.*\/(\w+)\.js$/.exec(f)[1];//得到apps/question/index这样的文件名
   entry[name] = f;
});

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules|web_modules/, loader: 'babel-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=5000' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(vert|frag)$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      server: { baseDir: ['./public'] },
      open: false
    })
  ]
};