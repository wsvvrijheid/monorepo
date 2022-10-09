import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArtistTemplate } from '@wsvvrijheid/ui'
import {
  getArtistPaths,
  getArtistStaticProps,
  useArtistById,
} from '@wsvvrijheid/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

type ArtistPageProps = {
  seo: NextSeoProps
}

const ArtistPage: FC<ArtistPageProps> = ({ seo }) => {
  const router = useRouter()
  const { data: artist } = useArtistById(router.query.id as string)

  return (
    <Layout seo={seo} isDark hasScroll>
      <ArtistTemplate artist={artist} />
    </Layout>
  )
}
export default ArtistPage

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getArtistPaths()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const queryClient = new QueryClient()
  const artist = await getArtistStaticProps(context)
  const locale = context.locale as StrapiLocale

  if (!artist) return { notFound: true }

  const title = artist.name || 'Artist'

  const seo = {
    title,
  }

  return {
    props: {
      seo,
      artist,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
