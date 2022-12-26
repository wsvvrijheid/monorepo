import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Activity } from '@wsvvrijheid/types'

export const getActivityById = async (id: number) => {
  const response = await Request.single<Activity>({
    url: 'api/activities',
    id,
    populate: ['localizations', 'image'],
  })

  return response?.data || null
}

export const useActivityById = (id: number) => {
  return useQuery({
    queryKey: ['activity-id', id],
    queryFn: () => getActivityById(id),
  })
}