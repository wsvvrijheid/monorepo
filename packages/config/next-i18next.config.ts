import { resolve } from 'path'

import { StrapiLocale } from '@wsvvrijheid/types'

export const i18nConfig = {
  i18n: {
    defaultLocale: 'en' as StrapiLocale,
    locales: ['en', 'nl', 'tr'] as StrapiLocale[],
  },
  localePath: resolve('public/locales'),
}
