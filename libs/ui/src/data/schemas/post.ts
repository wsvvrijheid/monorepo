import * as yup from 'yup'

import { Post } from '@wsvvrijheid/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const postSchema = yup.object({
  reference: yup.string(),
  tags: yupMultiSelect,
  description: yup.string().required('Description is required'),
  content: yup.string(),
  hashtag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  image: yup.mixed(),
  caps: yup.mixed(),
  video: yup.mixed(),
})

export const postFields: FormFields<Post> = [
  { name: 'description', isRequired: true, type: 'textarea' },
  {
    name: 'hashtag',
    type: 'select',
    url: 'api/hashtags',
  },
  { name: 'image', type: 'file' },
  { name: 'video', type: 'file' },
  { name: 'caps', type: 'file' },
  { name: 'content', type: 'markdown' },
  { name: 'reference' },
  {
    name: 'tags',
    type: 'select',
    url: 'api/tags',
    isMulti: true,
  },
]
