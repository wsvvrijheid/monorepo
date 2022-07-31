module.exports = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-i18next': 'react-i18next',
    };
    return config;
  },
};
