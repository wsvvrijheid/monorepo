import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo, NextSeoProps } from 'next-seo'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AdminLoginForm, LoginForm } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const LoginPage: FC<PageProps> = ({ seo }) => {
  return (
    <>
      <NextSeo {...seo} />
      <Box minH="inherit" h="full">
        <LoginForm isSamenvvv={true} />
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
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}
