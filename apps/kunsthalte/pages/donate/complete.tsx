import { FC } from 'react'

import { Center } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TOKEN } from '@wsvvrijheid/config'
import { Mutation, Request } from '@wsvvrijheid/lib'
import { mollieClient } from '@wsvvrijheid/mollie'
import { Donate, StrapiUrl } from '@wsvvrijheid/types'
import { Container, DonationResultAlert } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

type DonateCompletePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

// TODO Make transaction detail messages more user friendly and create translations
// TODO Add translations
const PaymentComplete: FC<DonateCompletePageProps> = ({ status }) => {
  const renderStatus = () => {
    if (status === 'paid') {
      return (
        <DonationResultAlert
          title="Thank you"
          description="We received your donation"
          status="success"
        />
      )
    }

    if (status === 'open') {
      return (
        <DonationResultAlert
          status="warning"
          title="Payment not completed!"
          description="It seems your payment has not been competed"
        />
      )
    }

    if (status === 'expired') {
      return (
        <DonationResultAlert
          status="warning"
          title="Expired"
          description="Payment link has been expired"
        />
      )
    }

    if (status === 'canceled') {
      return (
        <DonationResultAlert
          status="info"
          title="Cancelled"
          description="You canceled the donation"
        />
      )
    }

    if (status === 'failed') {
      return (
        <DonationResultAlert
          status="error"
          title="Failed"
          description="Transaction failed"
        />
      )
    }

    return (
      <DonationResultAlert
        status="warning"
        title="Not found"
        description="Transaction could not be found. Please contact!"
      />
    )
  }

  return (
    <Layout seo={{ title: 'Payment' }}>
      <Container maxWidth="container.sm">
        <Center minH="70vh">{renderStatus()}</Center>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async context => {
  const { query } = context

  const response = await Request.single<Donate>({
    id: Number(query.id),
    url: `api/donates`,
    populate: [],
  })

  const payment =
    response.data?.mollieId &&
    (await mollieClient.payments.get(response.data.mollieId))

  const status = payment?.status || null

  if (status === 'paid') {
    await Mutation.post(`api/donates/email/${query.id}` as StrapiUrl, {}, TOKEN)
  }

  return {
    props: {
      status,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  }
}

export default PaymentComplete
