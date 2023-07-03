import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Activity } from '@wsvvrijheid/types'

export const getArtById = async (id: number) => {
  const response = await strapiRequest<Activity>({
    url: 'api/arts',
    id,
    populate: ['localizations', 'image', 'artist.avatar'],
  })

  return response?.data || null
}

export const useArtById = (id: number) => {
  return useQuery({
    queryKey: ['art', id],
    queryFn: () => getArtById(id),
  })
}
