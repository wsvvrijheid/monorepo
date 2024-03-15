import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context'
import { strapiRequest } from '@fc/lib'
import { Blog, StrapiLocale } from '@fc/types'

export const getBlogs = async (locale: StrapiLocale, token: string | null) => {
  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    locale,
    sort: ['publishedAt:desc'],
    ...(token && { token }),
  })

  return response?.data || []
}

export const getAuthorBlogs = async (
  locale: StrapiLocale,
  authorID: number,
  blogId: number,
  token?: string | null
) => {
  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    filters: {
      $and: [{ author: { id: { $eq: authorID } } }, { id: { $ne: blogId } }],
    },
    pageSize: 2,
    sort: ['publishedAt:desc'],
    locale,
    ...(token && { token }),
  })

  return response?.data || []
}

export const useGetBlogs = () => {
  const { locale } = useRouter()
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale as StrapiLocale, token),
  })
}
