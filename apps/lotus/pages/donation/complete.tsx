import { FC } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Donation, StrapiLocale } from '@wsvvrijheid/types'
import { DonationCompleteTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

type DonationCompletePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const DonationComplete: FC<DonationCompletePageProps> = ({ status }) => {
  return (
    <Layout seo={{ title: 'Payment' }}>
      <DonationCompleteTemplate status={status} />
    </Layout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context
  const locale = context.locale as StrapiLocale

  if (query.id === 'cancel') {
    return {
      props: {
        status: 'cancel',
        ...(await ssrTranslations(locale)),
      },
    }
  }

  const response = await strapiRequest<Donation>({
    id: Number(query.id),
    url: `api/donates`,
    populate: [],
  })

  const status = response?.data?.status

  return {
    props: {
      status,
      ...(await ssrTranslations(locale)),
    },
  }
}

export default DonationComplete
