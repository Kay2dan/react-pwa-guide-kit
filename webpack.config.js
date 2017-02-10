'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({prod = false} = {}) => {
  process.env.NODE_ENV = prod ? 'production' : 'development';

  return {
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
      }]
    },
    plugins: [
      new CopyWebpackPlugin([{
        context: './public',
        from: '*.+(png|json)'
      }]),
    ],
    devServer: {
      contentBase: './public',
      inline: true,
      host: 'localhost',
      port: 8080
    }
  };
};