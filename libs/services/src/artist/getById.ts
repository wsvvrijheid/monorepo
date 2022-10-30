import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { StrapiLocale, User } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { getArtByArtist } from '../art/getByArtist'

export const getArtistById = async (
  locale: StrapiLocale,
  id: string,
): Promise<User | null> => {
  const artistResponse = await Request.single<User>({
    url: 'api/users',
    id: Number(id),
  })

  const artist = artistResponse.data

  if (!artist) return null

  const arts = await getArtByArtist(locale, artist.id)

  return {
    ...artist,
    arts,
  }
}

export const useArtistById = (id: string) => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['artist', locale, id],
    queryFn: () => getArtistById(locale as StrapiLocale, id),
  })
}
