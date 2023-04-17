import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

import { API_URL } from '@wsvvrijheid/config'
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

    const auth = { user, token, isLoggedIn: true }

    req.session = { ...req.session, ...auth }
    await req.session.save()
    res.json(auth)
  } catch (error) {
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
