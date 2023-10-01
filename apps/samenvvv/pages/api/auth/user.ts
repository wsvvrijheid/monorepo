import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { sessionOptions } from '@wsvvrijheid/secrets'

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.token) {
    // TODO: Create /profiles/me endpoint
    const profileResponse = await strapiRequest({
      endpoint: 'profiles',
      id: req.session.profileId as number,
      token: req.session.token,
    })

    const profile = profileResponse?.data || null

    return res.json({
      ...req.session,
      profile,
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
