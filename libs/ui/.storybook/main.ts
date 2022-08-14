import type { StorybookConfig } from '@storybook/core-common'
import path from 'path'

import rootMain from '../../../.storybook/main'

const config: StorybookConfig = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [
    ...rootMain.stories,
    '../**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    ...(rootMain.addons as string[]),
    '@nrwl/react/plugins/storybook',
    '@chakra-ui/storybook-addon',
    'storybook-react-i18next',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js'),
      },
    },
  ],
  staticDirs: ['../../assets/src'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config = await rootMain.webpackFinal(config, { configType })
    }

    // add your own webpack tweaks if needed

    return config
  },
}

export default config
