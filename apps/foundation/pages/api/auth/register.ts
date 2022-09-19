import { Auth, AuthResponse } from '@wsvvrijheid/types'
import { sessionOptions, getSessionUser } from '@wsvvrijheid/utils'
import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

const registerRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, username, email, password } = req.body

  const trimmedName = name.trim()
  const trimmedUsername = username.trim()
  const trimmedEmail = email.trim()

  try {
    const response = await axios.post<AuthResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      {
        name: trimmedName,
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      },
    )

    const emptyAuth: Auth = {
      user: null,
      isLoggedIn: false,
      token: null,
    }
    const token = response.data?.jwt

    if (!token) {
      return emptyAuth
    }

    const user = await getSessionUser(token)

    if (!user) {
      return emptyAuth
    }

    const auth: Auth = { user, token, isLoggedIn: true }

    req.session = { ...auth, ...req.session }

    await req.session.save()
    res.json(auth)
  } catch (error) {
    if (!error.response?.data?.error.message) {
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      res.json(error.response?.data)
    }
  }
}

const handler = withIronSessionApiRoute(registerRoute, sessionOptions)

export default handler
