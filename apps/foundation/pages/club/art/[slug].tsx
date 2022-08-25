import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { ArtTemplate, useAuth } from '@wsvvrijheid/ui'
import {
  getArtBySlug,
  getArtStaticPaths,
  useArtBySlug,
  useViewArtMutation,
} from '@wsvvrijheid/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

const ArtPage = ({ seo }) => {
  const auth = useAuth()

  const { data: art } = useArtBySlug()
  useViewArtMutation()

  if (!art) return null

  return (
    <Layout seo={seo}>
      <ArtTemplate auth={auth} />
    </Layout>
  )
}

export default ArtPage

export const getStaticPaths: GetStaticPaths = async context => {
  return await getArtStaticPaths(context.locales as StrapiLocale[])
}

export const getStaticProps: GetStaticProps = async context => {
  const { locale, params } = context
  const queryClient = new QueryClient()

  // See: `useGetArt` (services/art/find-one.js)
  // [art, locale, slug]
  const queryKey = ['art', locale, params.slug]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getArtBySlug(locale as StrapiLocale, params.slug as string),
  })

  const art = queryClient.getQueryData<Art>(queryKey)

  if (!art)
    return {
      notFound: true,
    }

  const slugs =
    art.localizations?.reduce((acc, l) => {
      acc[l.locale] = l.slug
      return acc
    }, {}) || {}

  const title = art.title || null
  const description = art.description || null
  const adminUrl = process.env['NX_API_URL']
  const siteUrl = process.env['NX_PUBLIC_URL']
  const images = art.images

  const seo = {
    title: art.title,
    description: art.description,
    content: art.content,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${siteUrl}/club/arts/${slugs[locale]}`,
      article: {
        publishedTime: art.publishedAt,
        modifiedTime: art.updatedAt,
        authors: [art.artist.user.username],
        // TODO add tags
      },
      images:
        images?.length > 0
          ? images.map(image => ({
              url: adminUrl + image?.url,
              secureUrl: adminUrl + image?.url,
              type: image?.mime,
              width: image?.width,
              height: image?.height,
              alt: art.title,
            }))
          : [],
    },
  }

  return {
    props: {
      seo,
      queryKey,
      slugs: { ...slugs, [locale]: art.slug },
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
