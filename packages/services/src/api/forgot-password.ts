import axios from 'axios'
import { NextApiHandler } from 'next'

import { API_URL } from '@wsvvrijheid/config'

export const forgotPasswordRouter: NextApiHandler = async (req, res) => {
  const { email } = req.body
  try {
    const response = await axios.post(
      'api/auth/forgot-password',
      { email },
      { baseURL: API_URL },
    )
    res.json(response.data)
  } catch (error: any) {
    console.error('error', error.response?.data)
    if (!error.response?.data?.error.message) {
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      res.json(error.response?.data)
    }
  }
}
