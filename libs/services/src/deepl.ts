import slugify from '@sindresorhus/slugify'
import { StrapiLocale, StrapiModel } from '@wsvvrijheid/types'
import axios from 'axios'

export const getTranslation = async (text: string, locale: StrapiLocale) => {
  // TODO: Remove localhost
  const response = await axios.post('http://localhost:4200/api/translate', {
    text,
    locale,
  })

  return response.data
}

export const getModelTranslation = async <
  T extends StrapiModel & { slug?: string },
>(
  model: T,
  translatedFields: (keyof T)[],
  locale: StrapiLocale,
) => {
  const translatedData = [] as T[]

  const locales = ['en', 'nl', 'tr'] as StrapiLocale[]

  await Promise.all(
    locales.map(async l => {
      if (l === locale) return

      const translatedModel = { locale: l } as T

      await Promise.all(
        translatedFields.map(async key => {
          const isTranslatedField = translatedFields.includes(key as keyof T)
          const value = model[key as keyof T]

          if (isTranslatedField && typeof value === 'string') {
            const translation = await getTranslation(value, l)
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
