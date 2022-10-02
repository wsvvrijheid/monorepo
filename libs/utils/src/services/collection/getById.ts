import { useQuery } from '@tanstack/react-query'
import { Collection } from '@wsvvrijheid/types'

import { Request } from '../../lib'

export const getCollectionById = async (id: number) => {
  const response = await Request.single<Collection>({
    url: 'api/collections',
    id,
    populate: ['localizations', 'image', 'arts.images', 'arts.artist'],
  })

  return response?.data || null
}

export const useCollectionById = (id: number) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => getCollectionById(id),
  })
}
