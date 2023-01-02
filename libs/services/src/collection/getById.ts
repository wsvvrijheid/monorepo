import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Collection } from '@wsvvrijheid/types'

export const getCollectionById = async (id: number) => {
  const response = await Request.single<Collection>({
    url: 'api/collections',
    id,
    populate: ['localizations', 'image', 'arts.image', 'arts.artist'],
  })

  return response?.data || null
}

export const useCollectionById = (id: number) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => getCollectionById(id),
  })
}
