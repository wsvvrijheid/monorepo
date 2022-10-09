/* eslint-disable @typescript-eslint/no-var-requires */
import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArtistTemplate } from '@wsvvrijheid/ui'
import { getArtistServerProps, useArtistById } from '@wsvvrijheid/utils'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { Layout } from '../../../components'

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

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const artist = await getArtistServerProps(context)
  const locale = context.locale as StrapiLocale

  const path = require('path')
  const i18nConfig = require(path.join(process.cwd(), 'next-i18next.config.js'))

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
  }
}
