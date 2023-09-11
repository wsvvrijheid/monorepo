import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { JoinTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../components'

const JoinPage = ({}) => {
  const { t } = useTranslation()

  const title = t('join-the-team')

  return (
    <Layout seo={{ title }}>
      <JoinTemplate title={title} />
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

export default JoinPage
