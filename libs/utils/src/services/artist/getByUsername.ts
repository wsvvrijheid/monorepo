import { useQuery } from '@tanstack/react-query'
import { StrapiLocale, User } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { request } from '../../lib'

export const getArtistByUsername = async (
  locale: StrapiLocale,
  username: string,
) => {
  const response = await request<User[]>({
    url: 'api/users',
    filters: {
      username: { $eq: username },
      arts: {
        id: {
          $gt: 0,
        },
      },
    },
    populate: [
      'arts.images',
      'arts.artist',
      'arts.artist.avatar',
      'arts.categories',
      'arts.localizations',
      'arts.comments.user.avatar',
      'arts.likers',
    ],
    locale,
  })

  return response?.data?.[0] || null
}

export const useArtistByUsername = (username?: string) => {
  const router = useRouter()
  const { locale } = router
  if (!username) {
    username = router.query['username'] as string
  }
  return useQuery({
    queryKey: ['artist', locale, username],
    queryFn: () =>
      getArtistByUsername(locale as StrapiLocale, username as string),
  })
}
