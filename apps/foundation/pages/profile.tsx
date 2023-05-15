import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useAuth } from '@wsvvrijheid/context'
import { AuthenticatedUserProfile } from '@wsvvrijheid/ui'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const Profile = ({ seo }) => {
  const { isLoggedIn } = useAuth()

  return (
    <Layout seo={seo} isDark>
      {isLoggedIn && <AuthenticatedUserProfile />}
    </Layout>
  )
}

export default Profile

export const getStaticProps = async context => {
  const { locale } = context

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
