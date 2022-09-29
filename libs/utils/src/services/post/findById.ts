import { useMemo } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Post, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Request } from '../../lib'

export const getPost = async (
  locale: StrapiLocale,
  id: number,
): Promise<Post | null> => {
  const response = await Request.single<Post>({
    url: 'api/posts',
    id,
    locale,
  })

  return response?.data || null
}

export const usePost = (id: number) => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['post', locale, id],
    queryFn: () => getPost(locale as StrapiLocale, id),
  })
}

export const useCurrentPost = () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  const queryKey = ['post', locale, slug]

  const { data } = useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData<Post>(queryKey),
  })

  return useMemo(() => data, [data])
}
