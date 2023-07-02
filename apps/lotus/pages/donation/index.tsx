import { GetStaticPropsContext } from 'next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { DonationTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

const DonationPage = () => {
  return (
    <Layout seo={{ title: 'Donation' }}>
      <DonationTemplate isDark />
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default DonationPage
