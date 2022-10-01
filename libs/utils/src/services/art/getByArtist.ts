import { useQuery } from '@tanstack/react-query'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Request } from '../../lib'

export const getArtByArtist = async (
  locale: StrapiLocale,
  username: string,
) => {
  const response = await Request.collection<Art[]>({
    url: 'api/arts',
    filters: {
      artist: { username: { $eq: username } },
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
    publicationState: 'preview',
  })

  return response?.data
}

export const useArtByArtist = (username?: string) => {
  const router = useRouter()
  const locale = router.locale
  return useQuery({
    queryKey: ['user-art', locale, username],
    queryFn: () => getArtByArtist(locale as StrapiLocale, username as string),
  })
}
