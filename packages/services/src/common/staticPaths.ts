import { strapiRequest } from '@wsvvrijheid/lib'
import {
  StrapiCollectionUrl,
  StrapiLocale,
  StrapiModel,
} from '@wsvvrijheid/types'

const getModelPaths = async <T extends StrapiModel>(
  url: StrapiCollectionUrl,
) => {
  const locales = ['tr', 'en', 'nl'] as StrapiLocale[]

  return (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await strapiRequest<T>({ url })

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
  url: StrapiCollectionUrl,
) => {
  const paths = await getModelPaths<T>(url)

  return { paths, fallback: true }
}
