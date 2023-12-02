import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { sessionOptions } from '@wsvvrijheid/secrets'

export const logoutRouter: NextApiHandler = async (req, res) => {
  const session = await getIronSession(req, res, sessionOptions)
  session.destroy()
  res.json({ isLoggedIn: false, token: null })
}
