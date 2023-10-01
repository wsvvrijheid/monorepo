import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { API_URL, COMMENT_TOKEN } from '@wsvvrijheid/config'
import { getSecret, sessionOptions } from '@wsvvrijheid/secrets'

const commentRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { profileId } = req.session
    const { name, content, email, art, recaptchaToken } = req.body

    const secret = getSecret('RECAPTCHA_SECRET_KEY')
    const captchaBody = `secret=${secret}&response=${recaptchaToken}`

    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        mode: 'no-cors',
        body: captchaBody,
      },
    )

    const recaptchaResponse = await response.json()

    if (!recaptchaResponse.success || recaptchaResponse.score < 0.5) {
      return res
        .status(400)
        .json({ message: 'Recaptcha failed', response: recaptchaResponse })
    }

    const commentBody = {
      ...(profileId && { profile: profileId }),
      content,
      name,
      art,
      email,
    }

    const commentResponse = await fetch(`${API_URL}/api/comments`, {
      method: 'POST',
      body: JSON.stringify(commentBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${COMMENT_TOKEN}`,
      },
    })

    const result = await commentResponse.json()

    return res.status(200).json(result)
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.error('COMMENT ERROR', error.response.data.error)

      return res
        .status(error.response.data.error.status)
        .json({ message: error.response.data.error.message })
    }

    console.error('COMMENT ERROR', error)

    res.status(500).json(error)
  }
}

const handler = withIronSessionApiRoute(commentRoute, sessionOptions)

export default handler
