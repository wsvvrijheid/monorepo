import { sessionOptions } from '@wsvvrijheid/lib'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy()
  res.json({ isLoggedIn: false, token: null })
}

const handler = withIronSessionApiRoute(logoutRoute, sessionOptions)

export default handler
