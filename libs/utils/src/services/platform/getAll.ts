import { useQuery } from '@tanstack/react-query'
import { Platform } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getAllPlatforms = async () => {
  const response = await request()<Platform[]>({
    url: 'api/platforms',
  })
  return response?.data || null
}

export const usePlatforms = () => {
  return useQuery({
    queryKey: ['platforms'],
    queryFn: getAllPlatforms,
  })
}
