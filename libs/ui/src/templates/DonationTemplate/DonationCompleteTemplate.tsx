import { FC } from 'react'

import { Center, Container } from '@chakra-ui/react'
import { PaymentStatus } from '@mollie/api-client'

import { DonationResultAlert } from '../../components'

type DonationCompleteTemplateProps = {
  status: PaymentStatus
}

// TODO Make transaction detail messages more user friendly and create translations
// TODO Add translations
export const DonationCompleteTemplate: FC<DonationCompleteTemplateProps> = ({
  status,
}) => {
  const renderStatus = () => {
    if (status === PaymentStatus.paid) {
      return (
        <DonationResultAlert
          title="Thank you"
          description="We received your donation"
          status="success"
        />
      )
    }

    if (status === PaymentStatus.open) {
      return (
        <DonationResultAlert
          status="warning"
          title="Payment not completed!"
          description="It seems your payment has not been competed"
        />
      )
    }

    if (status === PaymentStatus.expired) {
      return (
        <DonationResultAlert
          status="warning"
          title="Expired"
          description="Payment link has been expired"
        />
      )
    }

    if (status === PaymentStatus.canceled) {
      return (
        <DonationResultAlert
          status="info"
          title="Cancelled"
          description="You canceled the donation"
        />
      )
    }

    if (status === PaymentStatus.failed) {
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
    <Container maxWidth="container.sm">
      <Center minH="70vh">{renderStatus()}</Center>
    </Container>
  )
}
