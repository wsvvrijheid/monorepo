import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { ArtClubTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

const ClubPage = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('art-stop') }}>
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
        endpoint: 'arts',
        locale,
        filters: {
          approvalStatus: { $eq: 'approved' },
        },
      }),
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  }
}
