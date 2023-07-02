import { Request } from '@wsvvrijheid/lib'
import { StrapiLocale, StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

const getModelPaths = async <T extends StrapiModel>(url: StrapiUrl) => {
  const locales = ['tr', 'en', 'nl'] as StrapiLocale[]

  return (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await Request.collection<T>({ url })

        const models = responses?.data

        return models?.map(model => ({
          params: { slug: (model as { slug: string }).slug },
          locale,
        }))
      }),
    )
  ).flat()
}

export const getModelStaticPaths = async <T extends StrapiModel>(
  url: StrapiUrl,
) => {
  const paths = await getModelPaths<T>(url)

  return { paths, fallback: true }
}
