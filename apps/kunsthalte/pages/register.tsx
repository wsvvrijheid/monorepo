import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { SignupForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'

const RegisterPage = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('login.create-account') }}>
      <Box minH="inherit">
        <SignupForm providersToBeShown={['google']} />
      </Box>
    </Layout>
  )
}

export default RegisterPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
