import { FC } from 'react'

import { dehydrate } from '@tanstack/react-query'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArtistTemplate } from '@wsvvrijheid/ui'
import {
  getArtistPaths,
  getArtistStaticProps,
  useArtistByUsername,
} from '@wsvvrijheid/utils'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

type ArtistPageProps = {
  seo: NextSeoProps
}

const ArtistPage: FC<ArtistPageProps> = ({ seo }) => {
  const {
    query: { username },
  } = useRouter()

  const { data: artist, isLoading } = useArtistByUsername(username as string)

  return (
    <Layout seo={seo} isDark isLoading={isLoading} hasScroll>
      <ArtistTemplate artist={artist} />
    </Layout>
  )
}
export default ArtistPage

export const getStaticPaths = async context => {
  const paths = await getArtistPaths(context.locales)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { seo, queryClient } = await getArtistStaticProps(context)
  const locale = context.locale as StrapiLocale

  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
