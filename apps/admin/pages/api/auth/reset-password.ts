import { getSessionUser, sessionOptions } from '@wsvvrijheid/utils'
import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

const resetPassRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, password, passwordConfirmation } = req.body
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      {
        code,
        password,
        passwordConfirmation,
      },
    )

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
