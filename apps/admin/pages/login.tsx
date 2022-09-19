import { Box } from '@chakra-ui/react'
import { AdminLoginForm, useAuth } from '@wsvvrijheid/ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import i18nConfig from '../next-i18next.config'

const LoginPage = () => {
  useAuth('/', true)

  return (
    <Box minH="inherit" h="full">
      <AdminLoginForm />
    </Box>
  )
}

export default LoginPage

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Login',
    tr: 'Giriş',
    nl: 'Login',
  }

  const description = {
    en: '',
    tr: '',
    nl: '',
  }
  const seo = {
    title: title[locale],
    description: description[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
