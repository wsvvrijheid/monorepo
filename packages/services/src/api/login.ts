import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { sessionOptions } from '@wsvvrijheid/secrets'
import { loginAuth } from '@wsvvrijheid/services'
import { Auth } from '@wsvvrijheid/types'

export const loginRouter: NextApiHandler = async (req, res) => {
  const { identifier, password } = req.body

  try {
    const { profile, ...auth } = await loginAuth(identifier, password)

    const session = await getIronSession<Auth>(req, res, sessionOptions)

    session.user = auth.user
    session.token = auth.token
    session.isLoggedIn = true
    session.profileId = profile?.id || null

    await session.save()

    res.json({ ...auth, profile })
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.error('LOGIN_AUTH_ERROR', error.response.data.error)

      return res
        .status(error.response.data.error.status)
        .json({ message: error.response.data.error.message })
    }
    res.status(500).json({ message: 'Something went wrong' })
  }
}
