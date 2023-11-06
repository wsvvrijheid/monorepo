import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'

export const getBlogs = async (locale: StrapiLocale) => {
  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    locale,
  })

  return response?.data || []
}

export const getAuthorBlogs = async (
  locale: StrapiLocale,
  authorID: number,
  blogId: number,
) => {
  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    filters: {
      $and: [{ author: { id: { $eq: authorID } } }, { id: { $ne: blogId } }],
    },
    pageSize: 2,
    locale,
  })

  return response?.data || []
}

export const useGetBlogs = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale),
  })
}
