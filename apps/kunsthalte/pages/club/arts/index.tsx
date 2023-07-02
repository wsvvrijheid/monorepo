import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { ArtClubTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../../components'

const ClubPage: FC<{ title: string }> = ({ title }) => {
  return (
    <Layout seo={{ title }}>
      <ArtClubTemplate />
    </Layout>
  )
}
export default ClubPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    // We will be using `queryKey` in nested components especially invalidate queries after mutations
    // So, we need to keep the same order of the `queryKey` array

    // queryKey: [arts, locale, searchTerm, category, page]
    queryKey: ['arts', locale, null, null, '1'],
    queryFn: () =>
      strapiRequest<Art>({
        url: 'api/arts',
        locale,
        filters: {
          approvalStatus: { $eq: 'approved' },
        },
      }),
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
