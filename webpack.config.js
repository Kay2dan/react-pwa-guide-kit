'use strict';

const path = require('path');
const {LoaderOptionsPlugin, DefinePlugin, optimize} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isWebpack = require('is-webpack');
const SWPrecacheWebpackPlugin = isWebpack ? require('sw-precache-webpack-plugin') : require('sw-precache-webpack-dev-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const dotenvSafe = require('dotenv-safe').load();
const pkg = require('./package.json');

module.exports = ({production = false} = {}) => {
  process.env.NODE_ENV = production ? 'production' : 'development';

  const firebaseConfig = JSON.stringify({
    apiKey: process.env.FIREBASE_API_KEY,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  });

  const sourceMap = production ? 'cheap-module-source-map' : 'source-map';
  const chunkName = production ? '[name].[chunkhash].js' : '[name].js';

  const webpackConfig = {
    entry: {
      main: ['./src/main.js'],
      vendor: ['react', 'react-dom', 'react-router', 'material-ui', 'firebase']
    },
    output: {
      path: path.resolve(__dirname, './build'),
			filename: chunkName,
      chunkFilename: chunkName
    },
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loaders: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}], "react-app"],
          plugins: ['syntax-dynamic-import']
        }
      }]
    },
    devtool: sourceMap,
    plugins: [
      new optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest']
      }),
      new DefinePlugin({
        FIREBASE_CONFIG: firebaseConfig,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new HtmlWebpackPlugin(Object.assign({
        template: './public/index.html',
        favicon: './public/favicon.ico', 
      }, production ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true
        }
      } : {})),
      new PreloadWebpackPlugin(),
      new CopyWebpackPlugin([{
        context: './public',
        from: '*.*'
      }, {
        from: './src/firebase-messaging-sw.js',
        to: 'firebase-messaging-sw.js',
        transform: (content, from) => {
          return content.toString().replace(/FIREBASE_CONFIG/, firebaseConfig);
        }
      }]),
      new SWPrecacheWebpackPlugin({
        cacheId: `${pkg.name}-${pkg.version}`,
        stripPrefix: './build',
        staticFileGlobs: [
          path.join(path.resolve(__dirname, './build'), '**/*')
        ],
        runtimeCaching: [{
          urlPattern: /https:\/\/.+.firebaseio.com/,
          handler: 'cacheFirst'
        }],
        logger: function () {},
        filename: 'sw.js',
        minify: production
      })
    ],
    devServer: {
      contentBase: './public',
      inline: true,
      host: 'localhost',
      port: 8080
    }
  };

  if (production) {
    webpackConfig.plugins = webpackConfig.plugins.concat([
       new LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new optimize.UglifyJsPlugin({
        sourceMap: sourceMap
      })
    ]);
  }

  return webpackConfig;
};