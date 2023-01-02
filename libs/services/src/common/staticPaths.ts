import { Request, RequestArgs } from '@wsvvrijheid/lib'
import { StrapiLocale, StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

const getModelPaths = async <T extends StrapiModel>(
  url: StrapiUrl,
  locales: StrapiLocale[],
  args: Omit<RequestArgs, 'url'> = {},
) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await Request.collection<T[]>({
          url,
          locale,
          ...args,
        })

        const models = responses?.data

        return models?.map(model => ({
          params: { slug: (model as { slug: string }).slug },
          locale,
        }))
      }),
    )
  ).flat()

export const getModelStaticPaths = async <T extends StrapiModel>(
  url: StrapiUrl,
  locales: StrapiLocale[],
  args: Omit<RequestArgs, 'url'> = {},
) => {
  const paths = await getModelPaths<T>(url, locales, args)

  return { paths, fallback: true }
}
