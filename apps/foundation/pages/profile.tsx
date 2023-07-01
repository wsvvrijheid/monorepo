import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import i18nConfig from '@wsvvrijheid/config/next-i18next.config'
import { useAuthContext } from '@wsvvrijheid/context'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AuthenticatedUserProfile } from '@wsvvrijheid/ui'

import { Layout } from '../components'

type ProfileProps = InferGetStaticPropsType<typeof getStaticProps>

const Profile: FC<ProfileProps> = ({ seo }) => {
  const { isLoggedIn } = useAuthContext()

  return (
    <Layout seo={seo} isDark>
      {isLoggedIn && <AuthenticatedUserProfile />}
    </Layout>
  )
}

export default Profile

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Profile',
    tr: 'Profil',
    nl: 'Profiel',
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
