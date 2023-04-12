import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

import { API_URL } from '@wsvvrijheid/config'
import { sessionOptions } from '@wsvvrijheid/secrets'
import { getSessionUser } from '@wsvvrijheid/services'
import { AuthResponse } from '@wsvvrijheid/types'

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query
  const { access_token, access_secret } = req.body
  if (req.method === 'POST') {
    try {
      let url = `api/auth/${provider}/callback?access_token=${access_token}`

      if (provider === 'twitter') {
        url = `api/auth/${provider}/callback?access_token=${access_token}&access_secret=${access_secret}`
      }

      const socialLoginResponse = await axios.get<AuthResponse>(url, {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const token = socialLoginResponse.data.jwt

      if (!token) {
        return res.json({
          user: null,
          isLoggedIn: false,
          token: null,
        })
      }

      const sessionUser = await getSessionUser(token)

      const auth = { user: sessionUser, token, isLoggedIn: true }
      req.session = { ...auth, ...req.session }
      await req.session.save()
      res.json(auth)
    } catch (error) {
      if (!error.response?.data?.error.message) {
        return res.status(500).json({ message: 'Internal server error', error })
      } else {
        const messages = error.response?.data?.error.message

        return res.status(403).json({ message: messages })
      }
    }
  }
}

const handler = withIronSessionApiRoute(route, sessionOptions('api/social'))

export default handler
