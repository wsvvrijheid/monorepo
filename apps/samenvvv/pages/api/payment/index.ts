import { NextApiHandler } from 'next'

import { SITE_URL } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { TOKEN } from '@wsvvrijheid/secrets'
import { stripe } from '@wsvvrijheid/stripe'
import { Donation, DonationCreateInput } from '@wsvvrijheid/types'

const handler: NextApiHandler = async (req, res) => {
  const { amount, name, email, method, type } = req.body
  // Create blank donation in database
  const donation = await Mutation.post<Donation, DonationCreateInput>(
    'api/donates',
    { name, email, amount },
    TOKEN as string,
  )

  if (type === 'monthly') {
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
      payment_method_types: [method],
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
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer: customerID,
      success_url: `${SITE_URL}/donation/complete?id=${donation.id}`,
      cancel_url: `${SITE_URL}/donation/complete?id=cancel`,
    })

    res.status(200).send(payment.url)
  } else {
    const payment = await stripe.checkout.sessions.create({
      payment_method_types: [method],
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
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${SITE_URL}/donation/complete?id=${donation.id}`,
      cancel_url: `${SITE_URL}/donation/complete?id=cancel`,
    })
    res.status(200).send(payment.url)
  }
}

export default handler
