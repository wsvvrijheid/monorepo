import axios from 'axios'
import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { API_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { sessionOptions } from '@wsvvrijheid/secrets'
import { getSessionUser } from '@wsvvrijheid/services'
import { Auth, Profile } from '@wsvvrijheid/types'

export const resetPasswordRouter: NextApiHandler = async (req, res) => {
  try {
    const response = await axios.post('api/auth/reset-password', req.body, {
      baseURL: API_URL,
    })

    const token = response.data.jwt

    if (!token) {
      return res.json({
        user: null,
        token: null,
      })
    }

    const user = await getSessionUser(token)

    if (!user) {
      return res.json({
        user: null,
        token: null,
      })
    }

    const profileResponse = user?.id
    ? await strapiRequest<Profile>({
        endpoint: 'profiles/me',
        token,
      })
    : null

  const profile = profileResponse?.data || null

    const auth = { user, profile, token: true }

    const session = await getIronSession<Auth>(req, res, sessionOptions)

    session.user = user
    session.token = token
    session.profileId = profile?.id || null

    await session.save()
    res.json(auth)
  } catch (error: any) {
    console.error('error', error.response?.data)
    if (!error.response?.data?.error.message) {
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      res.json(error.response?.data)
    }
  }
}
