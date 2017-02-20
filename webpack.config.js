'use strict';

const path = require('path');
const {LoaderOptionsPlugin, DefinePlugin, optimize} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require(`sw-precache-webpack-plugin`);
const SWPrecacheWebpackDevPlugin = require(`sw-precache-webpack-dev-plugin`);
const isWebpack = require('is-webpack');
const pkg = require('./package.json');

module.exports = ({production = false} = {}) => {
  process.env.NODE_ENV = production ? 'production' : 'development';
  
  const webpackConfig = {
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
      new HtmlWebpackPlugin(Object.assign({
        inject: true,
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
      new (isWebpack ? SWPrecacheWebpackPlugin : SWPrecacheWebpackDevPlugin)({
        cacheId: `${pkg.name}-${pkg.version}`,
        stripPrefix: './build',
        staticFileGlobs: [
          path.join(path.resolve(__dirname, './build'), '**/*')
        ],
        runtimeCaching: [{
          urlPattern: /https:\/\/.+.firebaseio.com/,
          handler: 'networkFirst'
        }],
        logger: function () {},
        filename: 'sw.js',
        minify: true
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
      new optimize.UglifyJsPlugin(),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]);
  }

  return webpackConfig;
};