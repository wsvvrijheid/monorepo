import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import { StrapiCreateInput } from '@wsvvrijheid/types'

export const syncTopics = async (token: string) => {
  Mutation.post('api/topic/sync', {} as StrapiCreateInput, token)
}

export const useTopicSync = () => {
  const queryClient = useQueryClient()

  const { token } = useAuth()

  return useMutation({
    mutationKey: ['topics-sync'],
    mutationFn: () => syncTopics(token as string),
    onSuccess: () => {
      queryClient.invalidateQueries(['topics'])
    },
  })
}
