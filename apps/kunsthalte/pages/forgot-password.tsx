import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ForgotPasswordForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'

const ForgotPassword = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('password') }}>
      <Box minH="inherit">
        <ForgotPasswordForm />
      </Box>
    </Layout>
  )
}

export default ForgotPassword

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
