import type { StorybookConfig } from '@storybook/core-common'

const config: StorybookConfig = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  staticDirs: ['../../assets/src'],

  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.fallback = {
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        'next-i18next': 'react-i18next',
      }
    }

    return config
  },
}

export default config
