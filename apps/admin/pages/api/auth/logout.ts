import { sessionOptions } from '@wsvvrijheid/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy()
  res.json({ isLoggedIn: false, token: null })
}

export const logoutHandler = withIronSessionApiRoute(
  logoutRoute,
  sessionOptions,
)
