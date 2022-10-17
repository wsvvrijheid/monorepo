import { Box } from '@chakra-ui/react'
import { ForgotPasswordForm } from '@wsvvrijheid/ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const ForgotPassword = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <ForgotPasswordForm />
      </Box>
    </Layout>
  )
}

export default ForgotPassword

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Forgot Password',
    tr: 'Şifremi Unuttum',
    nl: 'Wachtwoord vergeten',
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
