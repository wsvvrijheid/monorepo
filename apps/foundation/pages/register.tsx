import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { SignupForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'

const RegisterPage: FC<{ seo: NextSeoProps }> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <SignupForm />
      </Box>
    </Layout>
  )
}

export default RegisterPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

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
