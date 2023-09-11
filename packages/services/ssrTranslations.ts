import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'

export const ssrTranslations = async (locale: StrapiLocale) =>
  serverSideTranslations(locale, ['common'], i18nConfig)
