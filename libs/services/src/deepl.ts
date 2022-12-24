import slugify from '@sindresorhus/slugify'
import { StrapiLocale, StrapiTranslatableModel } from '@wsvvrijheid/types'
import axios from 'axios'

export const getTranslation = async (text: string, locale: StrapiLocale) => {
  const response = await axios.post('/api/translate', { text, locale })

  return response.data
}

export const getModelTranslation = async <
  T extends StrapiTranslatableModel & { slug?: string },
>(
  model: T,
  translatedFields: (keyof T)[],
) => {
  const translatedData = [] as T[]

  const locales = ['en', 'nl', 'tr'] as StrapiLocale[]

  await Promise.all(
    locales.map(async l => {
      if (l === model.locale) return

      const translatedModel = { locale: l } as T

      await Promise.all(
        translatedFields.map(async key => {
          const value = model[key as keyof T]

          if (typeof value === 'string') {
            const translation = await getTranslation(value, l)
            console.log(value, translation)
            translatedModel[key as keyof T] = translation

            if (key === 'title') {
              let slug = slugify(translation)

              const isSlugTaken =
                slug === model.slug || translatedData.some(t => t.slug === slug)

              if (isSlugTaken) {
                slug = `${slug}-${l}`
              }

              translatedModel['slug'] = slug
            }
          }
        }),
      )

      translatedData.push(translatedModel)
    }),
  )

  return translatedData
}
