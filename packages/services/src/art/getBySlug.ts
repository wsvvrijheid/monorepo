import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Art } from '@wsvvrijheid/types'

export const getArtBySlug = async (slug: string): Promise<Art | null> => {
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
  })

  return response?.data?.[0] || null
}

export const useArtBySlug = () => {
  const { query } = useRouter()

  return useQuery({
    queryKey: ['art', query.slug],
    queryFn: () => getArtBySlug(query.slug as string),
  })
}
