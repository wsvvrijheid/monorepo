import { Request } from '@wsvvrijheid/lib'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'

export const getBlogPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await Request.collection<Blog[]>({
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
