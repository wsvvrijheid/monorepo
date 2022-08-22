import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { QueryClient, useQueryClient } from 'react-query'

import { HashtagReturnType } from '../hashtag'

export const setCurrentPost = (
  queryClient: QueryClient,
  locale: StrapiLocale,
  slug: string,
  id: number,
) => {
  const hashtag = queryClient.getQueryData<HashtagReturnType>([
    'hashtag',
    locale,
    slug,
  ])

  if (!hashtag || !hashtag?.posts) return

  const post = hashtag.posts.find(post => post.id === id)
  queryClient.setQueryData(['post', locale, slug], post)
}

export const useSetCurrentPost = () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  return (id: number) =>
    setCurrentPost(queryClient, locale as StrapiLocale, slug as string, id)
}
