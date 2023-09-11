import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { getArtistServerProps } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArtistTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../../components'

type ArtistPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ArtistPage: FC<ArtistPageProps> = ({ artist, arts }) => {
  return (
    <Layout
      seo={{ title: artist.name || artist.username || 'Artist' }}
      isDark
      hasScroll
    >
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

  return {
    props: {
      artist,
      arts,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
