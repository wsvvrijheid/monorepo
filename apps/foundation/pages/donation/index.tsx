import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { Request } from '@wsvvrijheid/lib'
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
  const platforms = await Request.collection<Platform[]>({
    url: 'api/platforms',
  })

  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
      platforms,
    },
    revalidate: 1,
  }
}

export default DonationPage
