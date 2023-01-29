import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiLocale,
  StrapiLocalizeInput,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { getModelTranslation } from './deepl'

type CreateLocalizationsArgs<T extends StrapiTranslatableModel> = {
  model: T
  translatedFields: (keyof T)[]
  url: StrapiUrl
  token: string
}

export const createLocalizations = async <T extends StrapiTranslatableModel>({
  model,
  translatedFields,
  url,
  token,
}: CreateLocalizationsArgs<T>) => {
  const modelTranslations = await getModelTranslation(
    model as unknown as T,
    translatedFields,
  )

  const [firstTranslation, secondTranslation] = modelTranslations

  const firstTranslationResponse = await Mutation.localize<
    T,
    StrapiLocalizeInput
  >(
    url,
    model.id,
    firstTranslation.locale as StrapiLocale,
    firstTranslation,
    token,
  )

  const secondTranslationResponse = await Mutation.localize(
    url,
    firstTranslationResponse?.id as number,
    secondTranslation.locale as StrapiLocale,
    secondTranslation,
    token,
  )

  return [firstTranslationResponse, secondTranslationResponse]
}
