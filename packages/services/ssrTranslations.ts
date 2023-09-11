import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'

export const ssrTranslations = async (
  locale: StrapiLocale,
  ns: string[] = [],
) => serverSideTranslations(locale, ['common', 'model', ...ns], i18nConfig)
