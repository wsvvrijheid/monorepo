import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { sessionOptions } from '@wsvvrijheid/secrets'
import { Auth } from '@wsvvrijheid/types'

export const userRouter: NextApiHandler = async (req, res) => {
  const session = await getIronSession<Auth>(req, res, sessionOptions)

  if (session.token) {
    // TODO: Create /profiles/me endpoint
    const profileResponse = session?.profileId
      ? await strapiRequest({
          endpoint: 'profiles/me',
          id: session.profileId as number,
          token: session.token,
        })
      : null

    const profile = profileResponse?.data || null

    return res.json({
      ...session,
      profile,
    })
  }

  res.json({
    token: null,
    user: null,
  })
}
