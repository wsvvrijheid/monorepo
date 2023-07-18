const eslintConfig = require('@wsvvrijheid/config/eslint-preset.js')

module.exports = {
  ...eslintConfig,
  rules: {
    ' @typescript-eslint/no-explicit-any': 'off',
    'import/no-anonymous-default-export': 'off',
    'turbo/no-undeclared-env-vars': 'off',
  },
}
