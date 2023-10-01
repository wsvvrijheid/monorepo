import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { API_URL } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { sessionOptions } from '@wsvvrijheid/secrets'
import { getAuth } from '@wsvvrijheid/services'
import { AuthResponse, ProfileCreateInput } from '@wsvvrijheid/types'

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
    const userId = response.data.user?.id as number

    const body: ProfileCreateInput = {
      user: userId,
      name: trimmedName,
      email: trimmedEmail,
    }

    await Mutation.post('profiles', body, token)

    const { profile, ...auth } = await getAuth(email, password)

    req.session = {
      ...auth,
      ...req.session,
      profileId: profile?.id || null,
    }

    await req.session.save()
    res.json({ ...auth, profile })
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.error('REGISTER_AUTH_ERROR', error.response.data.error)

      return res.json(error.response.data.error)
    }
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const handler = withIronSessionApiRoute(registerRoute, sessionOptions)

export default handler
