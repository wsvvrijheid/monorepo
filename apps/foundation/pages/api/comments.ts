import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import {
  COMMENT_TOKEN,
  NX_RECAPTCHA_SECRET_KEY,
  sessionOptions,
} from '@wsvvrijheid/secrets'
import { createArtComment } from '@wsvvrijheid/services'

const commentRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.session
  const { name, content, email, art, recaptchaToken } = req.body

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'no-cors',
      body: `secret=${NX_RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    },
  )

  const recaptchaResponse = await response.json()

  if (!recaptchaResponse.success || recaptchaResponse.score < 0.5) {
    return res.status(400).json({ message: 'Recaptcha failed' })
  }

  try {
    const commentResponse = await createArtComment({
      content,
      name,
      user: user?.id,
      art,
      token: COMMENT_TOKEN,
      email,
    })

    return res.status(200).json(commentResponse)
  } catch (error) {
    if (error.response?.data?.error) {
      console.error('COMMENT ERROR', error.response.data.error)

      return res
        .status(error.response.data.error.status)
        .json({ message: error.response.data.error.message })
    }
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const handler = withIronSessionApiRoute(commentRoute, sessionOptions)

export default handler
