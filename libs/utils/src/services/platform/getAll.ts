import { Platform } from '@wsvvrijheid/types'
import { useQuery } from 'react-query'

import { request } from '../../lib'

export const getAllPlatforms = async () => {
  const response = await request()<Platform[]>({
    url: 'api/projects',
  })
  return response?.data
}

export const usePlatforms = () => {
  return useQuery({
    queryKey: 'platforms',
    queryFn: getAllPlatforms,
  })
}
