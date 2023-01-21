import { RecommendedTweet } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { FormFields } from '../../admin'

export const recommendedTweetSchema = yup.object({
  text: yup.string().required('Text is required'),
  media: yup.mixed(),
  mentions: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
})

export const recommendedTweetFields: FormFields<RecommendedTweet> = [
  { name: 'text', isRequired: true },
  {
    name: 'mentions',
    type: 'select',
    url: 'api/mentions',
    isMulti: true,
    fields: ['username', 'data'],
  },

  { name: 'media', type: 'file', isRequired: true },
]
