import slugify from '@sindresorhus/slugify'
import { StrapiLocale, StrapiTranslatableModel } from '@wsvvrijheid/types'
import axios from 'axios'
import removeMarkdown from 'remove-markdown'

export const getTranslation = async (
  content: string,
  locale: StrapiLocale,
  isMarkdown?: boolean,
) => {
  let text = content

  if (isMarkdown) {
    try {
      text = removeMarkdown(content)
      // TODO Add proper way of removing html tags including self closing tags
      text.replace(/<.*?>(.*?)<\/.*?>/g, '').replace(/<.*?>(.*?)\/>/g, '')
    } catch (error) {
      console.error('Error removing markdown', error)
    }
  }

  try {
    const response = await axios.post('/api/translate', { text, locale })

    return response.data
  } catch (error) {
    console.error('Error translating', text)
    return `**NOT_TRANSLATED** ${content}`
  }
}

export const getModelTranslation = async <
  T extends StrapiTranslatableModel & { slug?: string },
>(
  model: T,
  translatedFields: (keyof T)[],
) => {
  const translatedData = [] as T[]

  const localesToBeTranslated = ['en', 'nl', 'tr'].filter(
    locale => locale !== model.locale,
  ) as StrapiLocale[]

  const fieldsToBeTranslated = translatedFields.filter(
    field => typeof field === 'string',
  )

  await Promise.all(
    localesToBeTranslated.map(async locale => {
      const translatedModel = { locale } as T

      await Promise.all(
        fieldsToBeTranslated.map(async key => {
          const value = model[key as keyof T]

          const translation = await getTranslation(
            value as string,
            locale,
            key === 'content',
          )

          console.log(value, translation)
          translatedModel[key as keyof T] = translation

          if (key === 'title') {
            let slug = slugify(translation as string)

            const isSlugTaken =
              slug === model.slug || translatedData.some(t => t.slug === slug)

            if (isSlugTaken) {
              slug = `${slug}-${locale}`
            }

            translatedModel['slug'] = slug
          }
        }),
      )

      translatedData.push(translatedModel)
    }),
  )

  return translatedData
}
