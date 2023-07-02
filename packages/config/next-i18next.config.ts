import { resolve } from 'path'

export const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'tr'],
  },
  localePath: resolve('public/locales'),
}
