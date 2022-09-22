import { StrapiLocale, User } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getArtistPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await request<User[]>({
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
