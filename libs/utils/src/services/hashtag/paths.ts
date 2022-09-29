import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'

import { Request } from '../../lib'

export const getHashtagPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await Request.collection<Hashtag[]>({
          url: 'api/hashtags',
          locale,
        })
        const hashtags = responses?.data as Hashtag[]
        return hashtags.map(({ slug }) => ({
          params: { slug },
          locale,
        }))
      }),
    )
  ).flat()
