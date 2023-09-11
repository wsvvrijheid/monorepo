import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AdminLoginForm } from '@wsvvrijheid/ui'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo title={t('login.sign-in')} />
      <Box minH="inherit" h="full">
        <AdminLoginForm />
      </Box>
    </>
  )
}

export default LoginPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}
