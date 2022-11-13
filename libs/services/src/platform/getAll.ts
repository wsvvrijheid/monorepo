import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Platform } from '@wsvvrijheid/types'

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
