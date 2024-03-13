import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { LoginForm } from '@fc/ui'

import { Layout } from '../components'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('login.signin') }}>
      <Box minH="inherit">
        <LoginForm />
      </Box>
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

export default LoginPage
