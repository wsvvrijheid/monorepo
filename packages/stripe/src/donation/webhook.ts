import { Mutation } from '@wsvvrijheid/lib'
import { getSecret } from '@wsvvrijheid/secrets'
import {
  Donation,
  DonationUpdateInput,
  StrapiEndpoint,
} from '@wsvvrijheid/types'

export const donationWebhook = async (event: any) => {
  // check the checkout session status, if it's paid then update the donation status

  if (event?.data?.object?.object === 'checkout.session') {
    const status = event.data.object.payment_status
    const checkoutSessionId = event.data.object.id
    const donationId = event.data.object.success_url.split('&')[1].slice(3)

    // Update donation status and stripe fields in database
    await Mutation.put<Donation, DonationUpdateInput>(
      'donates',
      donationId,
      {
        status,
        checkoutSessionId: checkoutSessionId as string,
      },
      getSecret('TOKEN'),
    )
    // Send email to customer
    if (status === 'paid') {
      await Mutation.post(
        `donates/email/${donationId}` as StrapiEndpoint,
        {},
        getSecret('TOKEN'),
      )
    }
  }
}
