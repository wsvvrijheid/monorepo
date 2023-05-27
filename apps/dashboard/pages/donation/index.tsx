import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AdminLayout, DonationTemplate } from '@wsvvrijheid/ui'

const DonationPage = () => {
  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('donation.title') }}>
      <DonationTemplate />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['admin', 'common'])),
    },
  }
}

export default DonationPage
