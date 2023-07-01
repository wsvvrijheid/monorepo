import { resolve } from 'path'

const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'tr'],
  },
  localePath: resolve('public/locales'),
}

export default i18nConfig
