import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '@wsvvrijheid/lib'
import { getAuth } from '@wsvvrijheid/services'
const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { identifier, password } = req.body

  try {
    const auth = await getAuth(identifier, password)

    req.session = { ...req.session, ...auth }
    await req.session.save()
    res.json(auth)
  } catch (error) {
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
