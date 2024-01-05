import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@chakra-ui/storybook-addon', '@storybook/addon-console'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.fallback = {
        fs: require.resolve('browserify-fs'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        '@wsvvrijheid/config': path.resolve(__dirname, '../../config'),
        '@wsvvrijheid/context': path.resolve(__dirname, '../../context'),
        '@wsvvrijheid/lib': path.resolve(__dirname, '../../lib'),
        '@wsvvrijheid/mocks': path.resolve(__dirname, '../../mocks'),
        '@wsvvrijheid/secrets': path.resolve(__dirname, '../../secrets'),
        '@wsvvrijheid/services': path.resolve(__dirname, '../../services'),
        '@wsvvrijheid/types': path.resolve(__dirname, '../../types'),
        '@wsvvrijheid/ui': path.resolve(__dirname, '../../ui'),
        '@wsvvrijheid/utils': path.resolve(__dirname, '../../utils'),
        'next-i18next': 'react-i18next',
      }
    }

    return config
  },
}

export default config
