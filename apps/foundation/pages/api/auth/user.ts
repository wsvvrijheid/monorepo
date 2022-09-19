import { sessionOptions } from '@wsvvrijheid/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.token) {
    // in a real world application you might read the user id from the session
    // and then do a database request
    // to get more information on the user if needed
    return res.json({
      ...req.session,
      isLoggedIn: true,
    })
  }

  res.json({
    isLoggedIn: false,
    token: null,
    user: null,
  })
}

const handler = withIronSessionApiRoute(userRoute, sessionOptions)

export default handler
