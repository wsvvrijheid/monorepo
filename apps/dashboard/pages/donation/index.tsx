import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Platform, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, DonationTemplate } from '@wsvvrijheid/ui'

type DonationPageProps = InferGetStaticPropsType<typeof getStaticProps>

const DonationPage: FC<DonationPageProps> = ({ platforms }) => {
  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('donation.title') }}>
      <DonationTemplate platforms={platforms.data} />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const platforms = await strapiRequest<Platform>({
    url: 'api/platforms',
  })

  return {
    props: {
      ...(await ssrTranslations(locale), ['admin']),
      platforms,
    },
    revalidate: 1,
  }
}

export default DonationPage
