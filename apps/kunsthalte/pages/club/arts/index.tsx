import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArtClubTemplate } from '@wsvvrijheid/ui'
import { getArts } from '@wsvvrijheid/utils'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

const ClubPage: FC<{ title: string }> = ({ title }) => {
  return (
    <Layout seo={{ title }}>
      <ArtClubTemplate />
    </Layout>
  )
}
export default ClubPage

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    // We will be using `queryKey` in nested components especially invalidate queries after mutations
    // So, we need to keep the same order of the `queryKey` array

    // queryKey: [arts, locale, searchTerm, category, page]
    queryKey: ['arts', locale, null, null, '1'],
    queryFn: () => getArts({ locale: locale as StrapiLocale }),
  })

  const seo = {
    title: {
      en: 'Art Club',
      nl: 'Kunst Club',
      tr: 'Sanat Kulübü',
    },
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      title: seo.title[locale],
      dehydratedState: dehydrate(queryClient),
    },
  }
}
