'use strict';

const path = require('path');
const {optimize} = require('webpack');
const isWebpack = require('is-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require(`sw-precache-webpack-${isWebpack ? '' : 'dev-'}plugin`);

module.exports = ({prod = false} = {}) => {
  process.env.NODE_ENV = prod ? 'production' : 'development';

  return {
    entry: {
      main: ['./src/index.js'],
      vendor: ['react', 'react-dom'],
    },
    output: {
      path: path.resolve(__dirname, './build'),
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
        from: '*.*'
      }]),
      new SWPrecacheWebpackPlugin({
        cacheId: require('./package.json').name,
        stripPrefix: './build',
        staticFileGlobs: [
          path.join(path.resolve(__dirname, './build'), '**/*')
        ],
        maximumFileSizeToCacheInBytes: 4194304,
        runtimeCaching: [{
          handler: 'cacheFirst',
          urlPattern: /https?:\/\/fonts.+/
        }],
        logger: function () {},
        filename: 'sw.js'
      }),
      new optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity
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