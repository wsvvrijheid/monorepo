import { FC } from 'react'

import { dehydrate, QueryClient, QueryKey } from '@tanstack/react-query'
import { API_URL, SITE_URL } from '@wsvvrijheid/config'
import { getArtBySlug, getModelStaticPaths } from '@wsvvrijheid/services'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { ArtTemplate } from '@wsvvrijheid/ui'
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
  return await getModelStaticPaths(
    'api/arts',
    context.locales as StrapiLocale[],
  )
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

  const slugs = art.slug || {}
  //  {art?.[`title_${router.locale as StrapiLocale}`]}
  const title = art?.[`title_${locale as StrapiLocale}`] || null
  const description = art?.[`description${locale as StrapiLocale}`] || null

  const image = art.image

  const seo = {
    title: art?.[`title_${locale as StrapiLocale}`],
    description: art?.[`description${locale as StrapiLocale}`],
    content: art?.[`content${locale as StrapiLocale}`],
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
      images: image
        ? [
            {
              url: API_URL + image.url,
              secureUrl: API_URL + image.url,
              type: image.mime,
              width: image.width,
              height: image.height,
              alt: art?.[`title_${locale as StrapiLocale}`],
            },
          ]
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
