import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

import { API_URL } from '@wsvvrijheid/config'
import { sessionOptions } from '@wsvvrijheid/secrets'
import { getSessionUser } from '@wsvvrijheid/services'
import { Auth, AuthResponse } from '@wsvvrijheid/types'

const registerRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, username, email, password } = req.body

  const trimmedName = name.trim()
  const trimmedUsername = username.trim()
  const trimmedEmail = email.trim()

  try {
    const response = await axios.post<AuthResponse>(
      'api/auth/local/register',
      {
        name: trimmedName,
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      },
      { baseURL: API_URL },
    )

    const emptyAuth: Auth = {
      user: null,
      isLoggedIn: false,
      token: null,
      profile: null,
    }
    const token = response.data?.jwt

    if (!token) {
      return emptyAuth
    }

    const user = await getSessionUser(token)

    if (!user) {
      return emptyAuth
    }

    // TODO: Extend this with the profile data from the backend
    const auth: Auth = { user, token, isLoggedIn: true, profile: null }

    req.session = { ...auth, ...req.session }

    await req.session.save()
    res.json(auth)
  } catch (error: any) {
    if (!error.response?.data?.error.message) {
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      res.json(error.response?.data)
    }
  }
}

const handler = withIronSessionApiRoute(registerRoute, sessionOptions)

export default handler
