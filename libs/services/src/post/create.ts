import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Post, PostCreateInput, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { createLocalizations } from '../createLocalizations'

export const createHashtagPost = async (postCreateInput: PostCreateInput) => {
  return Mutation.post<Post, PostCreateInput>('api/posts', {
    ...postCreateInput,
    publishedAt: null,
  })
}

export const useCreateHashtagPost = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const { locale } = useRouter()

  return useMutation({
    mutationKey: ['create-hashtag-post', locale],
    mutationFn: createHashtagPost,
    onSuccess: async post => {
      await createLocalizations({
        data: post,
        translatedFields: ['title', 'description', 'content'],
        locale: locale as StrapiLocale,
        url: 'api/posts',
      })

      queryClient.invalidateQueries(queryKey)
    },
  })
}
