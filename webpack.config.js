const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'?'development':'production';

/*
const styleLoader = require("style-loader")
const sassLoader = require("sass-loader")
*/
const cssLoader = require("css-loader")

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const js = {
  test: /\.(js|jsx)$/,
  exclude: [/node_modules/],
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        "@babel/env",
        "@babel/preset-react"
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ]
    }
  }
}

const fonts = {
  test: /\.(woff|ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  exclude: [/node_modules/],
  use: ['file-loader']
}

const serverCss = {
  test: /\.css$/i,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader'
  ]
}

const clientCss = {
  test: /\.css$/i,
  use: [
    'style-loader', 'css-loader'
  ]
}

const serverConfig = {
  mode: devMode,
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  entry: {
    'index.js': path.resolve(__dirname, 'src/server/index.js')
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [js, fonts, serverCss]
  },
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: '[name]'
  }
}

const clientConfig = {
  mode: devMode,
  target: 'web',
  entry: {
    'index.js': path.resolve(__dirname, 'src/client/index.js')
  },
  module: {
    rules: [js, fonts, clientCss]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'

    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name]'
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty',
    child_process: 'empty',
    
  }
}

module.exports = function(api) {
  if(api) api.cache(true);
  return [serverConfig, clientConfig]
}
