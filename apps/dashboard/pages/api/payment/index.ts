import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { createCheckout } from '@wsvvrijheid/stripe'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    await createCheckout(req, res)
  } catch (err) {
    res.status(500).json(err)
  }
}

export default handler
