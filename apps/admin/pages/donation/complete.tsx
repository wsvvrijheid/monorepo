import { FC } from 'react'

import { PaymentStatus } from '@mollie/api-client'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TOKEN } from '@wsvvrijheid/config'
import { Mutation, Request } from '@wsvvrijheid/lib'
import { mollieClient } from '@wsvvrijheid/mollie'
import { Donation, StrapiUrl } from '@wsvvrijheid/types'
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

  const response = await Request.single<Donation>({
    id: Number(query.id),
    url: `api/donates`,
    populate: [],
  })

  const payment =
    response.data?.mollieId &&
    (await mollieClient.payments.get(response.data.mollieId))

  const status = payment?.status || null

  if (status === PaymentStatus.paid) {
    await Mutation.post(`api/donates/email/${query.id}` as StrapiUrl, {}, TOKEN)
  }

  return {
    props: {
      status,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  }
}

export default DonationComplete
