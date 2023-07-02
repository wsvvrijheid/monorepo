import { FC } from 'react'

import { Payment, PaymentStatus } from '@mollie/api-client'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { Mutation, Request } from '@wsvvrijheid/lib'
import { mollieClient } from '@wsvvrijheid/mollie'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Donation, StrapiLocale, StrapiUrl } from '@wsvvrijheid/types'
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

  const response = await Request.single<Donation>({
    id: Number(query.id),
    url: `api/donates`,
    populate: [],
  })

  const payment =
    response.data?.mollieId &&
    (await mollieClient.payments.get(response.data.mollieId))

  const status = (payment as Payment)?.status || null

  if (status === PaymentStatus.paid) {
    await Mutation.post(
      `api/donates/email/${query.id}` as StrapiUrl,
      {},
      TOKEN as string,
    )
  }

  return {
    props: {
      status,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}

export default DonationComplete
