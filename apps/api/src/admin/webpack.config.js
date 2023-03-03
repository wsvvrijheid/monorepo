'use strict'

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = config => {
  config.plugins.push(new MonacoWebpackPlugin())

  return config
}
