'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = config => {
  config.plugins.push(new MonacoWebpackPlugin())

  return config
}
