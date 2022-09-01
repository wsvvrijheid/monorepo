import { SessionUser, Session } from '@wsvvrijheid/types'
import { fetcher, mutation, request, sessionOptions } from '@wsvvrijheid/utils'
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

      const socialLoginResponse = await fetcher(req.body.access_token).get(url)

      const token = socialLoginResponse.data.jwt
      const userId = socialLoginResponse.data.user?.id

      if (token) {
        const artistResponse = await request(token)({
          url: 'api/artists',
          filters: { user: { id: { $eq: userId } } },
        })

        if (!artistResponse?.data?.[0]) {
          await mutation(token).post('api/artists', {
            data: {
              user: userId,
              name: socialLoginResponse.data.user?.username,
            },
          })
        }

        const response = await request(token)({
          url: 'api/users',
          filters: { id: { $eq: userId } },
        })

        const userData = response.data?.[0]

        if (userData) {
          const user: SessionUser = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            volunteer: userData.volunteer,
            avatar: userData.avatar,
            artist: userData.artist,
          }

          const auth = { user, token, isLoggedIn: true }
          req.session = auth as Session

          await req.session.save()
          res.json(auth)
        }
      }
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
