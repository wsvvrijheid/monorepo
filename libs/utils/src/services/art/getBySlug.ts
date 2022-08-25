import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { request } from '../../lib'

export const getArtBySlug = async (locale: StrapiLocale, slug: string) => {
  const response = await request()<Art[]>({
    url: 'api/arts',
    filters: { slug: { $eq: slug } },
    populate: [
      'artist.user.avatar',
      'categories',
      'images',
      'localizations',
      'comments.user.avatar',
      'likers',
    ],
    locale,
  })

  return response?.data?.[0] || null
}

export const useArtBySlug = () => {
  const {
    locale,
    query: { slug },
  } = useRouter()
  return useQuery({
    queryKey: ['art', locale, slug],
    queryFn: () => getArtBySlug(locale as StrapiLocale, slug as string),
  })
}
