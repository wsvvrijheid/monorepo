import { useQuery } from '@tanstack/react-query'
import { Platform } from '@wsvvrijheid/types'

import { Request } from '../../lib'

export const getAllPlatforms = async () => {
  const response = await Request.collection<Platform[]>({
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
