import { Collection, StrapiLocale } from '@wsvvrijheid/types'

import { Request } from '../../lib'

export const getCollectionBySlug = async (
  locale: StrapiLocale,
  slug: string,
) => {
  const response = await Request.collection<Collection[]>({
    url: 'api/collections',
    filters: { slug: { $eq: slug } },
    populate: ['localizations', 'image', 'arts.images', 'arts.artist'],
    locale,
  })

  return response?.data?.[0] || null
}
