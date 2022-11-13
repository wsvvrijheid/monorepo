import { Request } from '@wsvvrijheid/lib'
import { User } from '@wsvvrijheid/types'

export const getArtistPaths = async () => {
  const responses = await Request.collection<User[]>({
    url: 'api/users',
    filters: {
      arts: {
        id: {
          $gt: 0,
        },
      },
    },
  })
  const artist = responses?.data

  return artist?.map(({ id }) => ({
    params: { id: id.toString() },
  }))
}

export const getArtistStaticPaths = async () => {
  const paths = await getArtistPaths()

  return {
    paths,
    fallback: true,
  }
}
