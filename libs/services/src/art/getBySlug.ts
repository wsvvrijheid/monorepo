import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Art } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const getArtBySlug = async (slug: string): Promise<Art | null> => {
  const response = await Request.collection<Art[]>({
    url: 'api/arts',
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

export const useArtBySlug = (slug?: string) => {
  const router = useRouter()
  if (!slug) {
    slug = router.query['slug'] as string
  }
  return useQuery({
    queryKey: ['art', slug],
    queryFn: () => getArtBySlug(slug as string),
  })
}
