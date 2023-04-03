import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Mutation } from '@wsvvrijheid/lib'
import { useAuthSelector } from '@wsvvrijheid/store'
import { StrapiCreateInput } from '@wsvvrijheid/types'

export const syncTopics = async (token: string) => {
  Mutation.post('api/topic/sync', {} as StrapiCreateInput, token)
}

export const useTopicSync = () => {
  const queryClient = useQueryClient()

  const { token } = useAuthSelector()

  return useMutation({
    mutationKey: ['topics-sync'],
    mutationFn: () => syncTopics(token as string),
    onSuccess: () => {
      queryClient.invalidateQueries(['topics'])
    },
  })
}
