import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Trend } from '@wsvvrijheid/types'

export const getTrends = async () => {
  const response = await strapiRequest<Trend>({
    endpoint: 'trend',
  })

  return response?.data || null
}

export const useTrends = () => {
  return useQuery({ queryKey: ['trends-data'], queryFn: getTrends })
}
