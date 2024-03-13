import { NextApiHandler } from 'next'

import { createCheckout } from '@fc/stripe'

export const paymentRouter: NextApiHandler = async (req, res) => {
  try {
    await createCheckout(req, res)
  } catch (err) {
    res.status(500).json(err)
  }
}
