import { Localize, StrapiLocale } from '@wsvvrijheid/types'
import axios from 'axios'

export const getTranslation = async (text: string, locale: StrapiLocale) => {
  const response = await axios.post('http://localhost:4200/api/translate', {
    text,
    locale,
  })

  return response.data
}

export const getDataTranslation = async (
  data: Record<string, string>,
  locale: StrapiLocale,
) => {
  const translatedData = {} as Localize<typeof data>

  const locales = ['en', 'nl', 'tr'].filter(l => l !== locale) as StrapiLocale[]

  await Promise.all(
    locales.map(async l => {
      translatedData[l] = {}
      Object.entries(data).map(async ([key, value]) => {
        translatedData[l][key] = await getTranslation(value, l)
      })
    }),
  )

  return translatedData
}
