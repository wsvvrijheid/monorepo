import { useQuery } from '@tanstack/react-query'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Request } from '../../lib'

export const getBlogs = async (locale: StrapiLocale) => {
  const response = await Request.collection<Blog[]>({
    url: 'api/blogs',
    locale,
    sort: ['publishedAt:desc'],
  })
  return response?.data || []
}

export const getAuthorBlogs = async (
  locale: StrapiLocale,
  authorID: number,
  blogId: number,
) => {
  const response = await Request.collection<Blog[]>({
    url: 'api/blogs',
    filters: {
      $and: [{ author: { id: { $eq: authorID } } }, { id: { $ne: blogId } }],
    },
    sort: ['publishedAt:desc'],
    pageSize: 2,
    locale,
  })

  return response?.data || []
}

export const useGetBlogs = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale as StrapiLocale),
  })
}
