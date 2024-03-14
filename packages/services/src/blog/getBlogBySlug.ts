import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SetRequired } from 'type-fest'

import { strapiRequest } from '@fc/lib'
import { Blog, StrapiLocale } from '@fc/types'

export const getBlogBySlug = async (
  locale: StrapiLocale,
  slug: string,
): Promise<Blog> => {
  const response = await strapiRequest<
    SetRequired<Blog, 'author' | 'image' | 'likers'>
  >({
    endpoint: 'blogs',
    populate: ['author', 'image', 'likers'],
    filters: { slug: { $eq: slug } },
    locale,
  })

  return response?.data?.[0] || null
}

export const useGetBlogSlug = () => {
  const { locale, query } = useRouter()

  return useQuery({
    queryKey: ['blog', locale, query.slug],
    queryFn: () => getBlogBySlug(locale as StrapiLocale, query.slug as string),
  })
}
