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

  const configs = {
    build: path.resolve(__dirname, './build'),
    src: path.resolve(__dirname, './src'),
    sourceMap: production ? 'cheap-module-source-map' : false,
    chunkName: production ? '[name].[chunkhash].js' : '[name].js'
  };

  const defined = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    FIREBASE_CONFIG: JSON.stringify({
      apiKey: process.env.FIREBASE_API_KEY,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })
  };

  const replaceDefined = (content, from) => {
    return content.toString().replace(/FIREBASE_CONFIG/, defined.FIREBASE_CONFIG);
  };

  const minify = production ? {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true
  } : {};

  const webpackConfig = {
    entry: {
      main: ['./src/main.js'],
      vendor: ['react', 'react-dom', 'react-router', 'material-ui', 'firebase']
    },
    output: {
      path: configs.build,
			filename: configs.chunkName,
      chunkFilename: configs.chunkName
    },
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        include: configs.src,
        loaders: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}], "react-app"],
          plugins: ['syntax-dynamic-import']
        }
      }]
    },
    devtool: configs.sourceMap,
    plugins: [
      new optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest']
      }),
      new DefinePlugin(defined),
      new HtmlWebpackPlugin(Object.assign({
        template: './public/index.html',
        favicon: './public/favicon.ico', 
      },{
        minify
      })),
      new PreloadWebpackPlugin(),
      new CopyWebpackPlugin([{
        context: './public',
        from: '*.*'
      }, {
        from: './src/firebase-messaging-sw.js',
        to: 'firebase-messaging-sw.js',
        transform: replaceDefined
      }]),
      new SWPrecacheWebpackPlugin({
        cacheId: `${pkg.name}-${pkg.version}`,
        stripPrefix: './build',
        staticFileGlobs: [
          path.join(configs.build, '**/*')
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