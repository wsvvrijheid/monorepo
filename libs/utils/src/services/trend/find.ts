import { useQuery } from '@tanstack/react-query'
import { Trend } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getTrends = async () => {
  const response = await request()<Trend>({
    url: 'api/trend',
  })

  return response?.data || null
}

export const useTrends = () => {
  return useQuery({ queryKey: ['trends-data'], queryFn: getTrends })
}
