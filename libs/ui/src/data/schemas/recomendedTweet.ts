import { RecommendedTweet } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { FormFields } from '../../admin'

export const recomendedTweetSchema = yup.object({
  text: yup.string().required('Text is required'),
  mentions: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
  media: yup.mixed(),
})

export const recomendedTweetFields: FormFields<RecommendedTweet> = [
  { name: 'text', isRequired: true },
  {
    name: 'mentions',
    type: 'select',
    url: 'api/mentions',
    isMulti: true,
    fields: ['username', 'data'],
  },

  { name: 'media' },
]