import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { SignupForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'

const RegisterPage = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('login.sign-up-header.title') }}>
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
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default RegisterPage
