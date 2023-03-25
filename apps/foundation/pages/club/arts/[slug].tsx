import { FC } from 'react'

import { dehydrate, QueryClient, QueryKey } from '@tanstack/react-query'
import { API_URL, SITE_URL } from '@wsvvrijheid/config'
import { getArtBySlug, searchModel } from '@wsvvrijheid/services'
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
  const artsResponse = await searchModel<Art>({
    url: 'api/arts',
  })

  const paths = artsResponse.data?.map(({ slug }) => ({
    params: { slug },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale

  // See: `useGetArt` (services/art/find-one.js)
  // [art, locale, slug]
  const queryKey = ['art', params.slug]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getArtBySlug(params.slug as string),
  })

  const art = queryClient.getQueryData<Art>(queryKey)

  if (!art)
    return {
      notFound: true,
    }

  const titleKey = `title_${locale}`
  const descriptionKey = `description_${locale}`

  const title = art[titleKey] || null
  const description = art[descriptionKey] || null
  const slug = art.slug

  const image = art.image

  const seo = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/club/arts/${slug}`,
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
              alt: title,
            },
          ]
        : [],
    },
  }

  return {
    props: {
      seo,
      queryKey,
      slugs: { en: slug, nl: slug, tr: slug },
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
