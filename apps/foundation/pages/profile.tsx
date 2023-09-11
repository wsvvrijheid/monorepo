import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@wsvvrijheid/context'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AuthenticatedUserProfile } from '@wsvvrijheid/ui'

import { Layout } from '../components'

const Profile = () => {
  const { isLoggedIn } = useAuthContext()
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('profile') }} isDark>
      {isLoggedIn && <AuthenticatedUserProfile />}
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default Profile
