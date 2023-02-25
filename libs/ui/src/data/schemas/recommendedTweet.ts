import { RecommendedTweet } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { FormFields } from '../../admin'

export const recommendedTweetSchema = yup.object({
  text: yup.string().required('Text is required'),
  mentions: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
  image: yup.mixed(),
})

export const recommendedTweetFields: FormFields<RecommendedTweet> = [
  { name: 'text', isRequired: true, type: 'textarea' },
  { name: 'image', type: 'file' },
  {
    name: 'mentions',
    type: 'select',
    url: 'api/mentions',
    isMulti: true,
  },
]
