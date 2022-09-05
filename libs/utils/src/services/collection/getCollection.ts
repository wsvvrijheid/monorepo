import { Collection, StrapiLocale } from '@wsvvrijheid/types'
import { request } from '@wsvvrijheid/utils'

export const getCollection = async (locale: StrapiLocale, slug: string) => {
  const response = await request()<Collection[]>({
    url: 'api/collections',
    filters: { slug: { $eq: slug } },
    populate: ['localizations', 'image', 'arts.images', 'arts.artist'],
    locale,
  })

  return response?.data?.[0] || null
}
