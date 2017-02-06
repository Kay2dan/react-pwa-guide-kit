'use strict';

process.env.NODE_ENV = 'development';

const path = require('path');

module.exports = {
  entry: {
    main: ['./src/index.js']
  },
  output: {
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, './src'),
      loaders: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  plugins: [],
  devServer: {
    contentBase: './public',
    inline: true,
    host: 'localhost',
    port: 8080
  }
};