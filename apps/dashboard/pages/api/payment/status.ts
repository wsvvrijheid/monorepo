import { NextApiHandler } from 'next'

import { Mutation } from '@wsvvrijheid/lib'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Donation, DonationUpdateInput, StrapiUrl } from '@wsvvrijheid/types'

const handler: NextApiHandler = async (req, res) => {
  try {
    const event = req.body
    if (!event) res.status(500).send('Something went wrong')

    // check the checkout session status, if it's paid then update the donation status
    if (event?.data?.object?.object === 'checkout.session') {
      const status = event.data.object.payment_status
      const checkoutSessionId = event.data.object.id
      const donationId = event.data.object.success_url.split('=')[1]

      // Update donation status and stripe fields in database
      await Mutation.put<Donation, DonationUpdateInput>(
        'api/donates',
        donationId,
        {
          status,
          checkoutSessionId: checkoutSessionId as string,
        },
        TOKEN as string,
      )
      // Send email to customer
      if (status === 'paid') {
        await Mutation.post(
          `api/donates/email/${donationId}` as StrapiUrl,
          {},
          TOKEN as string,
        )
      }
    }

    res.status(200).send('complete')
  } catch (err) {
    res.status(500).json(err)
  }
}

export default handler
