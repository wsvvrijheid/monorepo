import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo, NextSeoProps } from 'next-seo'

import { AdminLoginForm } from '@wsvvrijheid/ui'

import i18nConfig from '../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const LoginPage: FC<PageProps> = ({ seo }) => {
  return (
    <>
      <NextSeo {...seo} />
      <Box minH="inherit" h="full">
        <AdminLoginForm />
      </Box>
    </>
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

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
