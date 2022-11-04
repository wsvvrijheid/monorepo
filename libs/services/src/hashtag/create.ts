import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Hashtag, HashtagCreateInput, StrapiLocale } from '@wsvvrijheid/types'

export const createMainHashtag = async (
  hashtagCreateInput: HashtagCreateInput,
) => {
  return Mutation.post<Hashtag, HashtagCreateInput>('api/hashtags', {
    ...hashtagCreateInput,
    publishedAt: null,
  })
}

export const useCreateMainHashtag = (
  locale: StrapiLocale,
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-main-hashtag', locale],
    mutationFn: createMainHashtag,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: hashtag => {
      console.log('on success create main hashtag', hashtag)
    },
  })
}
