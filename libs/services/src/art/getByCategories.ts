import { useQuery } from '@tanstack/react-query'

import { Request } from '@wsvvrijheid/lib'
import { Art } from '@wsvvrijheid/types'

export const getArtsByCategories = async (
  categories: string[],
  id?: number,
) => {
  const response = await Request.collection<Art[]>({
    url: 'api/arts',
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
  return useQuery({
    queryKey: ['arts', categories, id],
    queryFn: () => getArtsByCategories(categories, id),
  })
}
