'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      new HtmlWebpackPlugin({
				inject: true,
				template: './public/index.html',
				favicon: './public/favicon.ico',
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true
				}
			})
    ],
    devServer: {
      contentBase: './public',
      inline: true,
      host: 'localhost',
      port: 8080
    }
  };
};