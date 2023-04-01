import { Box } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ResetPasswordForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const ForgotPassword = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <ResetPasswordForm />
      </Box>
    </Layout>
  )
}

export default ForgotPassword

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Reset Password',
    tr: 'Şifre Sıfırla',
    nl: 'Wachtwoord Resetten',
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
