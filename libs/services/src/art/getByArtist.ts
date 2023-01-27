import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Art, PublicationState, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const getArtByArtist = async (
  locale: StrapiLocale,
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
    locale,
    publicationState,
  })

  return response?.data
}

export const useArtByArtist = (
  userId?: number,
  publicationState?: PublicationState,
) => {
  const router = useRouter()
  const locale = router.locale

  return useQuery({
    queryKey: ['user-art', locale, userId],
    queryFn: () =>
      getArtByArtist(
        locale as StrapiLocale,
        userId as number,
        publicationState,
      ),
  })
}
