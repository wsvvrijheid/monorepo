import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Post, PostCreateInput, StrapiLocale } from '@wsvvrijheid/types'

import { createLocalizations } from '../createLocalizations'

export const createHashtagPost = async (postCreateInput: PostCreateInput) => {
  return Mutation.post<Post, PostCreateInput>('api/posts', {
    ...postCreateInput,
    publishedAt: null,
  })
}

export const useCreateHashtagPost = (
  locale: StrapiLocale,
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-hashtag-post', locale],
    mutationFn: createHashtagPost,
    onSuccess: async post => {
      await createLocalizations({
        data: post,
        translatedFields: ['title', 'description', 'content'],
        locale,
        url: 'api/posts',
      })

      queryClient.invalidateQueries(queryKey)
    },
  })
}
