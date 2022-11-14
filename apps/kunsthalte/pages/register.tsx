import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { SignupForm } from '@wsvvrijheid/ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const RegisterPage: FC<{ seo: NextSeoProps }> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <SignupForm providersToBeShown={['google']} />
      </Box>
    </Layout>
  )
}

export default RegisterPage

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Register',
    tr: 'Kayıt Ol',
    nl: 'Inschrijven',
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
