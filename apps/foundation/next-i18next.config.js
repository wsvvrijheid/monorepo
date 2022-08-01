const { resolve } = require('path')

/**
 * @type {import('next-i18next').UserConfig}
 **/
const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'tr'],
  },
  // localePath: '../../public/locales',
}

module.exports = i18nConfig
