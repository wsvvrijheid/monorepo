import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { COMMENT_TOKEN } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { getSecret, sessionOptions } from '@wsvvrijheid/secrets'
import { Comment, CommentArtCreateInput } from '@wsvvrijheid/types'

const commentRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { profileId } = req.session
  const { name, content, email, art, recaptchaToken } = req.body

  const secret = getSecret('RECAPTCHA_SECRET_KEY')
  const body = `secret=${secret}&response=${recaptchaToken}`

  console.log({
    name,
    content,
    email,
    art,
    recaptchaToken,
  })

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      mode: 'no-cors',
      body,
    },
  )

  const recaptchaResponse = await response.json()

  console.log('recaptchaResponse', recaptchaResponse)

  if (!recaptchaResponse.success || recaptchaResponse.score < 0.5) {
    return res
      .status(400)
      .json({ message: 'Recaptcha failed', response: recaptchaResponse })
  }

  try {
    const commentResponse = await Mutation.post<Comment, CommentArtCreateInput>(
      'comments',
      {
        ...(profileId && { profile: profileId }),
        content,
        name,
        art,
        email,
      },
      COMMENT_TOKEN,
    )

    return res.status(200).json(commentResponse)
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
