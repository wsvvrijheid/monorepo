import { useQuery } from '@tanstack/react-query'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { request } from '../../lib'

export const getArtsByCategories = async (
  locale: StrapiLocale,
  categories: string[],
  id?: number,
) => {
  const response = await request<Art[]>({
    url: 'api/arts',
    locale,
    filters: {
      categories: { code: { $in: categories } },
      id: { $ne: id },
      status: { $eq: 'approved' },
    },
    populate: ['artist.user.avatar', 'categories', 'images', 'likers'],
    sort: 'publishedAt:desc',
    pageSize: 4,
  })

  return response?.data || []
}

export const useArtsByCategories = (categories: string[], id?: number) => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['arts', locale, categories, id],
    queryFn: () => getArtsByCategories(locale as StrapiLocale, categories, id),
  })
}
