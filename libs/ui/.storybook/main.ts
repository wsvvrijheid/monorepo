import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@chakra-ui/storybook-addon',
    'storybook-react-i18next',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.fallback = {
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
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

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
