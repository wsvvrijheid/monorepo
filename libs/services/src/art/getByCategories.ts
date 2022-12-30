import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const getArtsByCategories = async (
  locale: StrapiLocale,
  categories: string[],
  id?: number,
) => {
  const response = await Request.collection<Art[]>({
    url: 'api/arts',
    locale,
    filters: {
      categories: { slug: { $in: categories } },
      id: { $ne: id },
      approvalStatus: { $eq: 'approved' },
    },
    populate: ['artist.avatar', 'categories', 'image', 'likers'],
    sort: 'publishedAt:desc',
    pageSize: 4, // TODO: Change this
  })

  return response?.data
}

export const useArtsByCategories = (categories: string[], id?: number) => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['arts', locale, categories, id],
    queryFn: () => getArtsByCategories(locale as StrapiLocale, categories, id),
  })
}
