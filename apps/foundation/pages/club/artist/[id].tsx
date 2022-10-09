/* eslint-disable @typescript-eslint/no-var-requires */
import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { StrapiLocale, User } from '@wsvvrijheid/types'
import { ArtistTemplate } from '@wsvvrijheid/ui'
import { getArtistServerProps } from '@wsvvrijheid/utils'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

type ArtistPageProps = {
  seo: NextSeoProps
  artist: User
}

const ArtistPage: FC<ArtistPageProps> = ({ seo, artist }) => {
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
