const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATHS = {
  root: path.resolve(__dirname, '..'),
  nodeModules: path.resolve(__dirname, '../node_modules'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist')
}

const DEV_SERVER = {
  hot: true,
  hotOnly: true,
  historyApiFallback: true,
  overlay: true
  // stats: 'verbose',
  // proxy: {
  //   '/api': 'http://localhost:3000'
  // },
}

module.exports = (env = {}) => {
  const isBuild = !!env.build
  const isDev = !env.build
  const isSourceMap = !!env.sourceMap || isDev

  return {
    cache: true,
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: DEV_SERVER,

    context: PATHS.root,

    entry: {
      app: [
        'react-hot-loader/patch',
        './src/index.js'
      ]
    },
    output: {
      path: PATHS.dist,
      filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
      publicPath: '/'
      // chunkFilename: '[id].chunk.js',
    },

    resolve: {
      alias: {
        Config$: isBuild ? `config/dist` : 'config/dev'
      },
      extensions: ['.js', '.jsx', '.json'],
      modules: ['src', 'node_modules']
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: PATHS.src,
          use: 'babel-loader'
        },
        {
          test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
          use: 'file-loader?limit=100000'
        }, {
          test: /\.svg$/,
          use: 'file-loader'
        },
        ...(isBuild ? [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'postcss-loader']
            })
          }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
          }
        ] : [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
          }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
          }
        ])
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './favicon.ico'
      }),
      ...(isDev ? [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('development')
          },
          __DEVELOPMENT__: true,
          __DEVTOOLS__: true
        }),
        new webpack.HotModuleReplacementPlugin({
          // multiStep: true, // better performance with many files
        }),
        new webpack.NamedModulesPlugin()
      ] : []),
      ...(isBuild ? [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          },
          __DEVELOPMENT__: false,
          __DEVTOOLS__: false
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          compress: {
            screw_ie8: true
          },
          comments: false,
          sourceMap: isSourceMap
        })
      ] : [])
    ]
  }
}
