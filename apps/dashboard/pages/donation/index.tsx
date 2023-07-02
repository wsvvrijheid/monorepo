import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, DonationTemplate } from '@wsvvrijheid/ui'

const DonationPage = () => {
  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('donation.title') }}>
      <DonationTemplate />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default DonationPage
