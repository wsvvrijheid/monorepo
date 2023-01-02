import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Hashtag } from '@wsvvrijheid/types'

export const getHashtagById = async (id: number) => {
  const response = await Request.single<Hashtag>({
    url: 'api/hashtags',
    id,
    populate: ['localizations', 'image', 'mentions', 'posts.image'],
  })

  return response?.data || null
}

export const useHashtagById = (id: number) => {
  return useQuery({
    queryKey: ['hashtag', id],
    queryFn: () => getHashtagById(id),
  })
}
