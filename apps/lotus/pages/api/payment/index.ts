import { NextApiHandler } from 'next'

import { SITE_URL } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { TOKEN } from '@wsvvrijheid/secrets'
import { stripe } from '@wsvvrijheid/stripe'
import { Donation, DonationCreateInput } from '@wsvvrijheid/types'

const handler: NextApiHandler = async (req, res) => {
  try {
    const { amount, name, email, method, type } = req.body
    // Create blank donation in database
    const donation = await Mutation.post<Donation, DonationCreateInput>(
      'api/donates',
      { name, email, amount },
      TOKEN as string,
    )

    // Check if customer exists
    const customer = await stripe.customers.list({
      email,
    })

    let customerID = customer.data.length > 0 ? customer.data[0].id : ''
    // Create customer if not exists
    if (customer.data.length === 0) {
      const newCustomer = await stripe.customers.create({
        email,
        name,
      })
      customerID = newCustomer.id
    }
    // Create checkout session for subscription
    const payment = await stripe.checkout.sessions.create({
      payment_method_types: [method === 'ideal' ? 'ideal' : 'card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Donatie',
              metadata: {
                strapi_id: donation.id,
              },
            },
            unit_amount: amount * 100,
            recurring: type === 'monthly' ? { interval: 'month' } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: type === 'monthly' ? 'subscription' : 'payment',
      customer: customerID,
      success_url: `${SITE_URL}/donation/complete?status=success&id=${donation.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/donation/complete?status=cancel`,
    })

    res.status(200).send(payment.url)
  } catch (err) {
    res.status(500).json(err)
  }
}

export default handler
