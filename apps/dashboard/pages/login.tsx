import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo, NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AdminLoginForm } from '@wsvvrijheid/ui'

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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

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
