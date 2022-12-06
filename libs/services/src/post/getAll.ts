import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Post, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const getAllPosts = async (locale: StrapiLocale) => {
  const response = await Request.collection<Post[]>({
    url: 'api/posts',
    pageSize: 100,
    locale,
  })

  return response?.data
}

export const usePosts = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['posts', locale],
    queryFn: () => getAllPosts(locale as StrapiLocale),
  })
}
