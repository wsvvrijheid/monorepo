import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { DonationTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

const DonationPage = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('donation.title') }}>
      <DonationTemplate />
    </Layout>
  )
}

export const getStaticProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  }
}

export default DonationPage
