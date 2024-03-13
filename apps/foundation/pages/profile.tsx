import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@fc/context'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { AuthenticatedUserProfile } from '@fc/ui'

import { Layout } from '../components'

const Profile = () => {
  const { user } = useAuthContext()
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('profile') }} isDark>
      {user && <AuthenticatedUserProfile />}
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
