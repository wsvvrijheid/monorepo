import { useQuery } from '@tanstack/react-query'

import { Request } from '@wsvvrijheid/lib'
import { Art, PublicationState } from '@wsvvrijheid/types'

export const getArtByArtist = async (
  userId: number,
  publicationState: PublicationState = 'live',
) => {
  const response = await Request.collection<Art[]>({
    url: 'api/arts',
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
    publicationState,
  })

  return response?.data
}

export const useArtByArtist = (
  userId?: number,
  publicationState?: PublicationState,
) => {
  return useQuery({
    queryKey: ['user-art', userId],
    queryFn: () => getArtByArtist(userId as number, publicationState),
  })
}
