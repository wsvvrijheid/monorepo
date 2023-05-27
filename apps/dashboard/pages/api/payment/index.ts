import { SITE_URL } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { mollieClient } from '@wsvvrijheid/mollie'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Donation, DonationCreateInput } from '@wsvvrijheid/types'

export default async function handler(req, res) {
  const { amount, name, email, method } = req.body

  // Create blank donation in database
  const donation = await Mutation.post<Donation, DonationCreateInput>(
    'api/donates',
    {
      name,
      email,
      amount,
    },
    TOKEN,
  )

  // Create mollie payment
  const payment = await mollieClient.payments.create({
    amount: {
      value: amount.toFixed(2),
      currency: 'EUR',
    },
    consumerName: name,
    method,
    billingEmail: email,
    metadata: {
      id: donation.id,
    },
    description: 'Wsvvrjheid donatie',
    redirectUrl: `${SITE_URL}/donation/complete?id=${donation.id}`,
    webhookUrl: `${SITE_URL}/api/payment/status`,
  })

  await res.status(200).send(payment.getCheckoutUrl())
}
