import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@chakra-ui/storybook-addon'],
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
        '@wsvvrijheid/config': path.resolve(__dirname, '../src/config'),
        '@wsvvrijheid/hooks': path.resolve(__dirname, '../src/hooks'),
        '@wsvvrijheid/lib': path.resolve(__dirname, '../src/lib'),
        '@wsvvrijheid/mocks': path.resolve(__dirname, '../src/mocks'),
        '@wsvvrijheid/mollie': path.resolve(__dirname, '../src/mollie'),
        '@wsvvrijheid/secrets': path.resolve(__dirname, '../src/secrets'),
        '@wsvvrijheid/services': path.resolve(__dirname, '../src/services'),
        '@wsvvrijheid/store': path.resolve(__dirname, '../src/store'),
        '@wsvvrijheid/types': path.resolve(__dirname, '../src/types'),
        '@wsvvrijheid/ui': path.resolve(__dirname, '../src/ui'),
        '@wsvvrijheid/utils': path.resolve(__dirname, '../src/utils'),
        'next-i18next': 'react-i18next',
      }
    }

    return config
  },
}

export default config

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
