import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { StrapiLocale } from '@wsvvrijheid/types'
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as StrapiLocale, [
        'common',
      ])),
    },
  }
}

export default DonationPage
