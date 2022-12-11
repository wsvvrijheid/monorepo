import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Hashtag, HashtagCreateInput } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const createMainHashtag = async (
  hashtagCreateInput: HashtagCreateInput,
) => {
  return Mutation.post<Hashtag, HashtagCreateInput>('api/hashtags', {
    ...hashtagCreateInput,
    publishedAt: null,
  })
}

export const useCreateMainHashtag = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const { locale } = useRouter()

  return useMutation({
    mutationKey: ['create-main-hashtag', locale],
    mutationFn: createMainHashtag,
    onSuccess: async () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}
