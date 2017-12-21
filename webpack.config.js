var path = require('path');
// var webpack = require('webpack');
var rootPath = path.join(__dirname, '../', '../');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.es6$/, loader: 'babel-loader' },
      { test: /\.jsx$/, loader: 'babel-loader'},
      // handle stylesheets required from node packages
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      // need to load all react-infinte modules via babel since it contains es6
      { test: /\.js$/, include: path.join(rootPath, 'node_modules', 'react-infinite'), loader: 'babel-loader' },
      // expose flux instance globally as $flux... must use coffe-loader if coffee-script
      { test: path.join(rootPath, 'frontend', 'javascripts', 'flux'), loader: 'expose?$flux!coffee-loader'}
    ]
  },
  stats: {
    errorDetails: true
  },
  devServer: {
    historyApiFallback: true
  }
}
