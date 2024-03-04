const eslintConfig = require('@fc/config/eslint-preset.js')

module.exports = {
  ...eslintConfig,
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
