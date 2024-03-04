import { useRouter } from 'next/router'

import { strapiRequest } from '@fc/lib'
import { Art } from '@fc/types'

import { useStrapiRequest } from '../common'

export const getArtBySlug = async (
  slug: string,
  token?: string,
): Promise<Art | null> => {
  const response = await strapiRequest<Art>({
    endpoint: 'arts',
    filters: { slug: { $eq: slug } },
    populate: [
      'artist.avatar',
      'categories',
      'image',
      'localizations',
      'comments.user.avatar',
      'likers',
    ],
    token,
  })

  return response?.data?.[0] || null
}

export const useArtBySlug = () => {
  const { query } = useRouter()

  const { data, ...rest } = useStrapiRequest<Art>({
    endpoint: 'arts',
    filters: { slug: { $eq: query.slug } },
    populate: [
      'artist.avatar',
      'categories',
      'image',
      'localizations',
      'comments.user.avatar',
      'likers',
    ],
  })

  return { ...rest, data: data?.data?.[0] }
}
