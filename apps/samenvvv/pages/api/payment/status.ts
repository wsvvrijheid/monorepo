import { NextApiHandler } from 'next'

import { Mutation } from '@wsvvrijheid/lib'
import { mollieClient } from '@wsvvrijheid/mollie'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Donation, DonationUpdateInput } from '@wsvvrijheid/types'

const handler: NextApiHandler = async (req, res) => {
  const mollieId = req.body.id
  const payment = await mollieClient.payments.get(mollieId)

  // Update donation status and mollieId fields in database
  await Mutation.put<Donation, DonationUpdateInput>(
    'api/donates',
    payment.metadata.id,
    {
      status: payment.status,
      mollieId,
    },
    TOKEN as string,
  )

  // respond to Mollie with 200 or it keeps calling
  res.status(200).send('complete')
}

export default handler
