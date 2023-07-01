const eslintConfig = require('@wsvvrijheid/config/eslint-preset.js')

module.exports = {
  ...eslintConfig,
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
