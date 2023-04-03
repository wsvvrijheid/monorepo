import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@chakra-ui/storybook-addon', 'storybook-react-i18next'],
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

      config.resolve.plugins = config.resolve.plugins || []
      config.resolve.plugins.push(
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        }),
      )
    }

    return config
  },
}

export default config
