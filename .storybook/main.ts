import type { StorybookConfig } from '@storybook/core-common'

const config: StorybookConfig = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  staticDirs: ['../public'],

  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.fallback = {
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        timers: require.resolve('timers-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
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
