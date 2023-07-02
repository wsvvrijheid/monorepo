import { FC } from 'react'

import { Payment, PaymentStatus } from '@mollie/api-client'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { Mutation, strapiRequest } from '@wsvvrijheid/lib'
import { mollieClient } from '@wsvvrijheid/mollie'
import { TOKEN } from '@wsvvrijheid/secrets'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Donation, StrapiLocale, StrapiUrl } from '@wsvvrijheid/types'
import { AdminLayout, DonationCompleteTemplate } from '@wsvvrijheid/ui'

type DonationCompletePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const DonationComplete: FC<DonationCompletePageProps> = ({ status }) => {
  return (
    <AdminLayout seo={{ title: 'Payment' }}>
      <DonationCompleteTemplate status={status} />
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context
  const locale = context.locale as StrapiLocale

  const response = await strapiRequest<Donation>({
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
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default DonationComplete
