import { Volunteer } from '@wsvvrijheid/types'
import { useQuery } from 'react-query'

import { request } from '../../lib'

export const getVolunteers = async () => {
  const response = await request()<Volunteer[]>({
    url: 'api/volunteers',
    filters: { approved: { $eq: true } },
  })

  return response?.data || null
}

export const useVolunteers = (initialData: Array<Volunteer> = []) => {
  return useQuery('volunteers', getVolunteers, {
    initialData,
  })
}
