'use strict';

const devserver = process.argv[1].includes('webpack-dev-server');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = devserver ? require('sw-precache-webpack-dev-plugin') : require('sw-precache-webpack-plugin');

module.exports = ({prod = false} = {}) => {
  process.env.NODE_ENV = prod ? 'production' : 'development';

  return {
    entry: {
      main: ['./src/index.js']
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