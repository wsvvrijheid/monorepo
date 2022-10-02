import { useQuery } from '@tanstack/react-query'
import { Volunteer } from '@wsvvrijheid/types'

import { Request } from '../../lib'

export const getVolunteers = async (preview?: boolean) => {
  const response = await Request.collection<Volunteer[]>({
    url: 'api/volunteers',
    filters: { approved: { $eq: true } },
    publicationState: preview ? 'preview' : 'live',
  })

  return response?.data || null
}

export const useVolunteers = (
  initialData: Array<Volunteer> = [],
  preview?: boolean,
) => {
  return useQuery(['volunteers'], () => getVolunteers(preview), {
    initialData,
  })
}
