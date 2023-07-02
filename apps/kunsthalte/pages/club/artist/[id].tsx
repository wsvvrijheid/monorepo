import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { getArtistServerProps } from '@wsvvrijheid/services'
import { Art, StrapiLocale, User } from '@wsvvrijheid/types'
import { ArtistTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../../components'

type ArtistPageProps = {
  seo: NextSeoProps
  artist: User
  arts: Art[]
}

const ArtistPage: FC<ArtistPageProps> = ({ seo, artist, arts }) => {
  return (
    <Layout seo={seo} isDark hasScroll>
      <ArtistTemplate artist={artist} arts={arts} />
    </Layout>
  )
}
export default ArtistPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient()
  const { artist, arts } = await getArtistServerProps(context)
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
      arts,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
