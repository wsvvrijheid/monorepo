import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { API_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { sessionOptions } from '@wsvvrijheid/secrets'
import { getSessionUser } from '@wsvvrijheid/services'

const resetPassRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.post('api/auth/reset-password', req.body, {
      baseURL: API_URL,
    })

    const token = response.data.jwt

    if (!token) {
      return res.json({
        user: null,
        isLoggedIn: false,
        token: null,
      })
    }

    const user = await getSessionUser(token)

    if (!user) {
      return res.json({
        user: null,
        isLoggedIn: false,
        token: null,
      })
    }

    const profileResponse = await strapiRequest({
      endpoint: 'profiles',
      filters: {
        user: { id: user.id },
      },
    })

    const profile = profileResponse?.data?.[0] || null

    const auth = { user, profile, token, isLoggedIn: true }

    req.session.user = user
    req.session.token = token
    req.session.isLoggedIn = true
    req.session.profileId = profile?.id || null

    await req.session.save()
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

const handler = withIronSessionApiRoute(resetPassRoute, sessionOptions)

export default handler
