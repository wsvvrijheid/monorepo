import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { SignupForm } from '@fc/ui'

import { Layout } from '../components'

const RegisterPage = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('login.create-account') }}>
      <Box minH="inherit">
        <SignupForm />
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

export default RegisterPage
