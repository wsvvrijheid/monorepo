import { FC, useState } from 'react'

import { Box } from '@chakra-ui/react'
import { SignupForm, SignupFormFieldValues } from '@wsvvrijheid/ui'
import axios from 'axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const RegisterPage: FC<{ seo: NextSeoProps }> = ({ seo }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(true)
  const router = useRouter()

  const handleSubmitSignUp = async (data: SignupFormFieldValues) => {
    try {
      const resp = await axios.post('/api/auth/register', data)

      if (resp?.data?.error) {
        setErrorMessage(resp?.data.error?.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 2000)
      } else {
        router.push('/')
      }
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        setErrorMessage(error?.response?.data?.error?.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 2000)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  const handleTermsAccepted = () => {
    setIsTermsAccepted(!isTermsAccepted)
  }
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <SignupForm
          isTermsAccepted={isTermsAccepted}
          onAcceptTerms={handleTermsAccepted}
          onSignup={handleSubmitSignUp}
          errorMessage={errorMessage}
        />
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
