import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { ActivityCreateInput, Activity } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

// import { createLocalizations } from '../createLocalizations'

export const createActivity = async (
  activityCreateInput: ActivityCreateInput,
) => {
  return Mutation.post<Activity, ActivityCreateInput>('api/activities', {
    ...activityCreateInput,
    publishedAt: null,
  })
}

export const useCreateActivity = (queryKey?: QueryKey) => {
  const queryClient = useQueryClient()
  const { locale } = useRouter()

  return useMutation({
    mutationKey: ['create-activity', locale],
    mutationFn: createActivity,
    onSuccess: async activity => {
      // await createLocalizations({
      //   data: activity,
      //   translatedFields: ['title', 'description', 'content'],
      //   locale: locale as StrapiLocale,
      //   url: 'api/activities',
      // })

      queryClient.invalidateQueries(queryKey)
    },
  })
}
