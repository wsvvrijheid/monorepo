import { useQuery } from '@tanstack/react-query'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Request } from '../../lib'

export const getArtBySlug = async (
  locale: StrapiLocale,
  slug: string,
): Promise<Art | null> => {
  const response = await Request.collection<Art[]>({
    url: 'api/arts',
    filters: { slug: { $eq: slug } },
    populate: [
      'artist.avatar',
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

export const useArtBySlug = (slug?: string) => {
  const router = useRouter()
  const locale = router.locale
  if (!slug) {
    slug = router.query['slug'] as string
  }
  return useQuery({
    queryKey: ['art', locale, slug],
    queryFn: () => getArtBySlug(locale as StrapiLocale, slug as string),
  })
}
