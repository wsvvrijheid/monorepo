import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { LoginForm } from '@wsvvrijheid/ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const LoginPage: FC<{ seo: NextSeoProps }> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <LoginForm />
      </Box>
    </Layout>
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
