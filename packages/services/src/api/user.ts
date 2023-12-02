import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { sessionOptions } from '@wsvvrijheid/secrets'
import { Auth } from '@wsvvrijheid/types'

export const userRouter: NextApiHandler = async (req, res) => {
  const session = await getIronSession<Auth>(req, res, sessionOptions)
  if (session.token) {
    // TODO: Create /profiles/me endpoint
    const profileResponse = await strapiRequest({
      endpoint: 'profiles',
      id: session.profileId as number,
      token: session.token,
    })

    const profile = profileResponse?.data || null

    return res.json({
      ...session,
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
