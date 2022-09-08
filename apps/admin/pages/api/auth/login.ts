import { sessionOptions, getAuth } from '@wsvvrijheid/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { identifier, password } = req.body

  try {
    const auth = await getAuth(identifier, password)

    req.session = { ...req.session, ...auth }
    await req.session.save()
    res.json(auth)
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const handler = withIronSessionApiRoute(loginRoute, sessionOptions)

export default handler
