import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiLocale,
  StrapiLocalizeInput,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { getModelTranslation } from './deepl'

type CreateLocalizationsArgs<T extends StrapiTranslatableModel> = {
  data: T
  translatedFields: (keyof T)[]
  locale: StrapiLocale
  url: StrapiUrl
}

export const createLocalizations = async <T extends StrapiTranslatableModel>({
  data,
  locale,
  translatedFields,
  url,
}: CreateLocalizationsArgs<T>) => {
  const modelTranslations = await getModelTranslation(
    data as unknown as T,
    translatedFields,
    locale,
  )

  const [firstTranslation, secondTranslation] = modelTranslations

  const firstTranslationResponse = await Mutation.localize<
    T,
    StrapiLocalizeInput
  >(url, data.id, firstTranslation.locale as StrapiLocale, firstTranslation)

  const secondTranslationResponse = await Mutation.localize(
    url,
    firstTranslationResponse.id,
    secondTranslation.locale as StrapiLocale,
    secondTranslation,
  )

  return [firstTranslationResponse, secondTranslationResponse]
}
