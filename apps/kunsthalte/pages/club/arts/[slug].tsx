import { FC } from 'react'

import { dehydrate, QueryClient, QueryKey } from '@tanstack/react-query'
import { API_URL, SITE_URL } from '@wsvvrijheid/config'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { ArtTemplate } from '@wsvvrijheid/ui'
import { getArtBySlug, getArtStaticPaths } from '@wsvvrijheid/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

type ArtPageProps = {
  seo: NextSeoProps
  queryKey: QueryKey
}

const ArtPage: FC<ArtPageProps> = ({ seo, queryKey }) => {
  return (
    <Layout seo={seo}>
      <ArtTemplate queryKey={queryKey} />
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

  const images = art.images

  const seo = {
    title: art.title,
    description: art.description,
    content: art.content,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/club/arts/${slugs[locale]}`,
      article: {
        publishedTime: art.publishedAt,
        modifiedTime: art.updatedAt,
        authors: [art.artist?.username || null],
        // TODO add tags
      },
      images:
        images?.length > 0
          ? images.map(image => ({
              url: API_URL + image?.url,
              secureUrl: API_URL + image?.url,
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
