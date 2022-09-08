import { mutation, sessionOptions, getAuth } from '@wsvvrijheid/utils'
import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

const registerRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, username, email, password } = req.body

  const trimmedName = name.trim()
  const trimmedUsername = username.trim()
  const trimmedEmail = email.trim()

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      {
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      },
    )

    const token = response.data.jwt
    const userId = response.data.user?.id

    await mutation(token).post('api/artists', {
      data: { user: userId, name: trimmedName },
    })

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
