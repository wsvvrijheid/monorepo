import { StrapiLocale, Collection } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getCollectionPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await request<Collection[]>({
          url: 'api/collections',
          locale,
        })

        const collections = responses?.data

        return collections?.map(({ slug }) => ({
          params: { slug },
          locale,
        }))
      }),
    )
  ).flat()
