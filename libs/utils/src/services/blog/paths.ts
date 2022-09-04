import { Blog, StrapiLocale } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getBlogPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await request()<Blog[]>({
          url: 'api/blogs',
          locale,
        })

        const blogs = responses?.data

        return blogs?.map(({ slug }) => ({
          params: { slug },
          locale,
        }))
      }),
    )
  ).flat()
