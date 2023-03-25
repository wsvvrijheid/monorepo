import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Art, User } from '@wsvvrijheid/types'

import { getArtByArtist } from '../art/getByArtist'

export const getArtistById = async (
  id: string,
): Promise<(User & { arts: Art[] }) | null> => {
  const artistResponse = await Request.single<User>({
    url: 'api/users',
    id: Number(id),
  })

  const artist = artistResponse.data

  if (!artist) return null

  const arts = await getArtByArtist(artist.id)

  return {
    ...artist,
    arts,
  }
}

export const useArtistById = (id: string) => {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: () => getArtistById(id),
  })
}
