import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { Hashtag, HashtagCreateInput, StrapiLocale } from '@wsvvrijheid/types'

import { getTranslation } from '../deepl'

export const createMainHashtag = (hashtagCreateInput: HashtagCreateInput) => {
  return Mutation.post<Hashtag, HashtagCreateInput>('api/hashtags', {
    ...hashtagCreateInput,
    publishedAt: null,
  })
}

export const useCreateMainHashtag = (
  local: StrapiLocale,
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-mainhashtag'],
    mutationFn: createMainHashtag,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: (text: string) => {
      console.log('on success create main hashtag', text)
      const data = getTranslation(text, local)
      console.log('Translation data', data)
    },
  })
}
