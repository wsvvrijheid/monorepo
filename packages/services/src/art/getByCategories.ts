import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Art } from '@wsvvrijheid/types'

export const getArtsByCategories = async (
  categories: string[],
  id?: number,
) => {
  const response = await strapiRequest<Art>({
    url: 'api/arts',
    filters: {
      categories: { slug: { $in: categories } },
      id: { $ne: id },
      approvalStatus: { $eq: 'approved' },
    },
    populate: ['artist.avatar', 'categories', 'image', 'likers'],
  })

  return response?.data
}

export const useArtsByCategories = (categories: string[], id?: number) => {
  return useQuery({
    queryKey: ['arts', categories, id],
    queryFn: () => getArtsByCategories(categories, id),
  })
}
