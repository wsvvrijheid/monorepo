import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Post, PostCreateInput } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

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
    onSuccess: async () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}
