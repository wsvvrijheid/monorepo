import { useQuery } from '@tanstack/react-query'
import { Art, PublicationState, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Request } from '../../lib'

export const getArtByArtist = async (
  locale: StrapiLocale,
  id: number,
  publicationState: PublicationState = 'live',
) => {
  const response = await Request.collection<Art[]>({
    url: 'api/arts',
    filters: {
      artist: { id: { $eq: id } },
    },
    populate: [
      'artist.avatar',
      'categories',
      'images',
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
  id?: number,
  publicationState?: PublicationState,
) => {
  const router = useRouter()
  const locale = router.locale
  return useQuery({
    queryKey: ['user-art', locale, id],
    queryFn: () =>
      getArtByArtist(locale as StrapiLocale, id as number, publicationState),
  })
}
