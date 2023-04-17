import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '@wsvvrijheid/secrets'

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy()
  res.json({ isLoggedIn: false, token: null })
}

const handler = withIronSessionApiRoute(logoutRoute, sessionOptions)

export default handler
