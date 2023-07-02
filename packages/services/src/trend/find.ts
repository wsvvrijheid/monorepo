import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@wsvvrijheid/lib'
import { StrapiSingleUrl, Trend } from '@wsvvrijheid/types'

export const getTrends = async () => {
  const response = await strapiRequest<Trend>({
    url: 'api/trend' as StrapiSingleUrl,
  })

  return response?.data || null
}

export const useTrends = () => {
  return useQuery({ queryKey: ['trends-data'], queryFn: getTrends })
}
