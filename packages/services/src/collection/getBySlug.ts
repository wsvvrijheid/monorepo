import { strapiRequest } from '@wsvvrijheid/lib'
import { Collection, StrapiLocale } from '@wsvvrijheid/types'

export const getCollectionBySlug = async (
  locale: StrapiLocale,
  slug: string,
) => {
  const response = await strapiRequest<Collection>({
    url: 'api/collections',
    filters: { slug: { $eq: slug } },
    populate: ['localizations', 'image', 'arts.image', 'arts.artist'],
    locale,
  })

  return response?.data?.[0] || null
}
