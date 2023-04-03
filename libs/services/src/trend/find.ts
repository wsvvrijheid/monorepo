import { useQuery } from '@tanstack/react-query'

import { Request } from '@wsvvrijheid/lib'
import { Trend } from '@wsvvrijheid/types'

export const getTrends = async () => {
  const response = await Request.single<Trend>({
    url: 'api/trend',
  })

  return response?.data || null
}

export const useTrends = () => {
  return useQuery({ queryKey: ['trends-data'], queryFn: getTrends })
}
