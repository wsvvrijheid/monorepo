import Stripe from 'stripe'

import { getSecret } from '@wsvvrijheid/secrets'

export const stripe = new Stripe(getSecret('STRIPE_KEY') as string, {
  apiVersion: '2022-11-15',
})
