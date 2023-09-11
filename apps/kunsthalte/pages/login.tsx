import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { LoginForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('login.sign-in') }}>
      <Box minH="inherit">
        <LoginForm providersToBeShown={['google']} />
      </Box>
    </Layout>
  )
}

export default LoginPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}
