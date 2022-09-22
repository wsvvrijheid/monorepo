import { AuthResponse } from '@wsvvrijheid/types'
import { fetcher, sessionOptions, getSessionUser } from '@wsvvrijheid/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query
  if (req.method === 'POST') {
    try {
      let url = `/api/auth/${provider}/callback?access_token=${req.body.access_token}`

      if (provider === 'twitter') {
        url = `/api/auth/${provider}/callback?access_token=${req.body.access_token}&access_secret=${req.body.access_secret}`
      }

      const socialLoginResponse = await fetcher(
        req.body.access_token,
      ).get<AuthResponse>(url)

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

const handler = withIronSessionApiRoute(route, sessionOptions)

export default handler
