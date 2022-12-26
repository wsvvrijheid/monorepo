import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'

export const syncTopics = async () => {
  Mutation.post('api/topic/sync', {})
}

export const useTopicSync = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['topics-sync'],
    mutationFn: syncTopics,
    onSuccess: () => {
      queryClient.invalidateQueries(['topics'])
    },
  })
}
