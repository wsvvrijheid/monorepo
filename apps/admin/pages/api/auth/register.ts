import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { API_URL } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { sessionOptions } from '@wsvvrijheid/secrets'
import { getAuth } from '@wsvvrijheid/services'
import { AuthResponse } from '@wsvvrijheid/types'

const registerRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, username, email, password } = req.body

  const trimmedName = name.trim()
  const trimmedUsername = username.trim()
  const trimmedEmail = email.trim()

  try {
    const response = await axios.post<AuthResponse>(
      'api/auth/local/register',
      { username: trimmedUsername, email: trimmedEmail, password },
      { baseURL: API_URL },
    )

    const token = response.data.jwt
    const userId = response.data.user?.id

    const body = { user: userId, name: trimmedName }

    await Mutation.put('api/users', userId, body, token)

    const auth = await getAuth(email, password)

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
