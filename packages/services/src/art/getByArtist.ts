import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@fc/lib'
import { Art } from '@fc/types'

export const getArtByArtist = async (
  profileId: number,
  includeDrafts?: boolean,
) => {
  if (!profileId) return []

  const response = await strapiRequest<Art>({
    endpoint: 'arts',
    filters: {
      artist: { id: { $eq: profileId } },
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

export const useArtsByArtist = (
  profileId?: number,
  includeDrafts?: boolean,
) => {
  return useQuery({
    queryKey: ['user-arts', profileId],
    queryFn: () => getArtByArtist(profileId as number, includeDrafts),
  })
}
