import { StrapiLocale, User } from '@wsvvrijheid/types'

import { Request } from '../../lib'

export const getArtistPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await Request.collection<User[]>({
          url: 'api/users',
          filters: {
            arts: {
              locale,
              id: {
                $gt: 0,
              },
            },
          },
        })
        const artist = responses?.data
        return artist?.map(({ username }) => ({
          params: { username },
        }))
      }),
    )
  ).flat()

export const getArtistStaticPaths = async (locales: StrapiLocale[]) => {
  const paths = await getArtistPaths(locales)

  return {
    paths,
    fallback: true,
  }
}
