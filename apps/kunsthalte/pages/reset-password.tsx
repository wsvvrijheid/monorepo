import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import i18nConfig from '@wsvvrijheid/config/next-i18next.config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ResetPasswordForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'

type ForgotPasswordProps = InferGetStaticPropsType<typeof getStaticProps>

const ForgotPassword: FC<ForgotPasswordProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <ResetPasswordForm />
      </Box>
    </Layout>
  )
}

export default ForgotPassword

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

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
