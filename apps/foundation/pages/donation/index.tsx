import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Platform, StrapiLocale } from '@wsvvrijheid/types'
import { DonationTemplate } from '@wsvvrijheid/ui'


import { Layout } from '../../components'

type DonationPageProps = InferGetStaticPropsType<typeof getStaticProps>

const DonationPage: FC<DonationPageProps> = ({ platforms }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('donation.title') }}>
      <DonationTemplate platforms={platforms.data} />
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const platforms = await strapiRequest<Platform>({
    url: 'api/platforms',
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      platforms,
    },
    revalidate: 1,
  }
}

export default DonationPage
