import { FC, useEffect } from 'react'

import { Box } from '@chakra-ui/react'
import { checkAuth, useAppDispatch } from '@wsvvrijheid/store'
import { AdminLoginForm } from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo, NextSeoProps } from 'next-seo'

import i18nConfig from '../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const LoginPage: FC<PageProps> = ({ seo }) => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then(auth => {
        if (auth.isLoggedIn) {
          router.push('/')
        }
      })
  }, [router, dispatch])

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
