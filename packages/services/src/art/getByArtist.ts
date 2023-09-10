import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Art } from '@wsvvrijheid/types'

export const getArtByArtist = async (
  userId: number,
  includeDrafts?: boolean,
) => {
  const response = await strapiRequest<Art>({
    endpoint: 'arts',
    filters: {
      artist: { id: { $eq: userId || null } },
    },
    populate: [
      'artist.avatar',
      'categories',
      'image',
      'localizations',
      'comments.user.avatar',
      'likers',
    ],
    includeDrafts,
  })

  return response?.data
}

export const useArtByArtist = (userId?: number, includeDrafts?: boolean) => {
  return useQuery({
    queryKey: ['user-art', userId],
    queryFn: () => getArtByArtist(userId as number, includeDrafts),
  })
}
