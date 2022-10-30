import { Request } from '@wsvvrijheid/lib'
import { Art, StrapiLocale } from '@wsvvrijheid/types'

export const getArtPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await Request.collection<Art[]>({
          url: 'api/arts',
          locale,
        })

        const arts = responses?.data

        return arts?.map(({ slug }) => ({
          params: { slug },
          locale,
        }))
      }),
    )
  ).flat()

export const getArtStaticPaths = async (locales: StrapiLocale[]) => {
  const paths = await getArtPaths(locales)

  return {
    paths,
    fallback: true,
  }
}
