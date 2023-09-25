import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '@wsvvrijheid/secrets'
import { getAuth } from '@wsvvrijheid/services'
const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { identifier, password } = req.body

  try {
    const { profile, ...auth } = await getAuth(identifier, password)

    req.session.isLoggedIn = auth.isLoggedIn
    req.session.user = auth.user
    req.session.token = auth.token
    req.session.profileId = profile?.id || null

    await req.session.save()
    res.json({ ...auth, profile })
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.error('LOGIN_AUTH_ERROR', error.response.data.error)

      return res
        .status(error.response.data.error.status)
        .json({ message: error.response.data.error.message })
    }
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const handler = withIronSessionApiRoute(loginRoute, sessionOptions)

export default handler
