import { API_URL } from '@wsvvrijheid/config'
import { sessionOptions } from '@wsvvrijheid/utils'
import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse, NextApiRequest } from 'next'

const forgotPassRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body
  try {
    const response = await axios.post(
      'api/auth/forgot-password',
      { email },
      { baseURL: API_URL },
    )
    res.json(response.data)
  } catch (error) {
    console.error('error', error.response?.data)
    if (!error.response?.data?.error.message) {
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      res.json(error.response?.data)
    }
  }
}

const handler = withIronSessionApiRoute(forgotPassRoute, sessionOptions)

export default handler
