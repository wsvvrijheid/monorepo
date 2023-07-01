import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
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
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as StrapiLocale,
        ['admin', 'common'],
        i18nConfig,
      )),
    },
  }
}

export default DonationPage
