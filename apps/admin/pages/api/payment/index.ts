import { TOKEN, SITE_URL } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { mollieClient } from '@wsvvrijheid/mollie'
import { Donate, DonateCreateInput } from '@wsvvrijheid/types'

export default async function handler(req, res) {
  const { amount, name, email, method } = req.body

  // Create blank donate in database
  const donate = await Mutation.post<Donate, DonateCreateInput>(
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
      id: donate.id,
    },
    description: 'Wsvvrjheid donatie',
    redirectUrl: `${SITE_URL}/donate/complete?id=${donate.id}`,
    webhookUrl: `${SITE_URL}/api/payment/status`,
  })

  await res.status(200).send(payment.getCheckoutUrl())
}
