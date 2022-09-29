import { useQuery } from '@tanstack/react-query'
import { Volunteer } from '@wsvvrijheid/types'

import { Request } from '../../lib'

export const getVolunteers = async () => {
  const response = await Request.collection<Volunteer[]>({
    url: 'api/volunteers',
    filters: { approved: { $eq: true } },
  })

  return response?.data || null
}

export const useVolunteers = (initialData: Array<Volunteer> = []) => {
  return useQuery(['volunteers'], getVolunteers, {
    initialData,
  })
}
