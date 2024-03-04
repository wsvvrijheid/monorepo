import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { ResetPasswordForm } from '@fc/ui'

import { Layout } from '../components'

const ForgotPassword = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('reset-pass.title') }}>
      <Box minH="inherit">
        <ResetPasswordForm />
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
