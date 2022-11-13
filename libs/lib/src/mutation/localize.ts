import {
  StrapiLocale,
  StrapiLocalizeInput,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { mutation } from './mutation'

export const localizeMutation = <
  T extends StrapiTranslatableModel,
  D extends StrapiLocalizeInput,
>(
  url: StrapiUrl,
  id: number,
  locale: StrapiLocale,
  body: D,
  token?: string,
) => mutation<T, D>({ url, method: 'localize', id, locale, body, token })
