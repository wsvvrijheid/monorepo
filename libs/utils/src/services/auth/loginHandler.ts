import { API_URL } from '@wsvvrijheid/config'
import { Session, SessionUser } from '@wsvvrijheid/types'
import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '../../lib'

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { identifier, password } = req.body

  try {
    const response = await axios.post(`${API_URL}/api/auth/local`, {
      identifier,
      password,
    })

    const token = response.data.jwt
    const userId = response.data.user?.id

    if (token) {
      const response = await axios.get(
        `${API_URL}/api/users/${userId}?populate=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const user: SessionUser = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        volunteer: response.data.volunteer,
        avatar: response.data.avatar,
        artist: response.data.artist,
      }

      ;(req.session as Session).user = user
      ;(req.session as Session).isLoggedIn = true
      ;(req.session as Session).token = token
      await req.session.save()
      res.json({ user, isLoggedIn: true, token })
    }
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const loginHandler = withIronSessionApiRoute(loginRoute, sessionOptions)
