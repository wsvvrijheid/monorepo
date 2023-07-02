import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ForgotPasswordForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'

type ForgotPasswordProps = InferGetStaticPropsType<typeof getStaticProps>

const ForgotPassword: FC<ForgotPasswordProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <ForgotPasswordForm />
      </Box>
    </Layout>
  )
}

export default ForgotPassword

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Forgot Password',
    tr: 'Şifremi Unuttum',
    nl: 'Wachtwoord vergeten',
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
      ...(await ssrTranslations(locale)),
    },
  }
}
