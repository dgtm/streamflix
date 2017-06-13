const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
     loaders: [
      {
        test: /\.svg$/,
        loader:'img-loader'
      },
      {
        test: /\.css$/,
        loader:'style!css!'
      },
       {
         test: /.jsx?$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
           presets: ['es2015', 'react']
         }
       }
     ]
   },
};
