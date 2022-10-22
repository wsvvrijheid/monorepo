import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Hashtag, HashtagCreateInput, StrapiLocale } from '@wsvvrijheid/types'

import { Mutation } from '../../lib'
import { getTranslation } from '../deepl'

export const createMainHashtag = (hashtagCreateInput: HashtagCreateInput) => {
  return Mutation.post<Hashtag, HashtagCreateInput>('api/hashtag', {
    ...hashtagCreateInput,
    publishedAt: null,
  })
}

export const useCreateMainHashtag = (
  text: string,
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
    onSuccess: () => {
      const data = getTranslation(text, local)
      console.log('Translation data', data)
    },
  })
}
