import * as yup from 'yup'

import { Post } from '@fc/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const usePostSchema = () => {
  return yup.object({
    reference: yup.string(),
    tags: yupMultiSelect,
    description: yup.string().required(),
    content: yup.string(),
    hashtag: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    image: yup.mixed(),
    caps: yup.mixed(),
    video: yup.mixed(),
    videoUrl: yup.string(),
  })
}

export const postFields: FormFields<Post> = [
  { name: 'description', isRequired: true, type: 'textarea' },
  {
    name: 'hashtag',
    type: 'select',
    endpoint: 'hashtags',
  },
  {
    name: 'image',
    type: 'file',
    group: { value: 'image', name: 'media' },
  },
  {
    name: 'video',
    type: 'file',
    group: { value: 'video', name: 'media' },
  },
  {
    name: 'videoUrl',
    type: 'mediaUrl',
    group: {
      label: 'VideoUrl',
      value: 'videoUrl',
      name: 'media',
    },
  },
  {
    name: 'caps',
    type: 'file',
    group: { label: 'Caps', value: 'caps', name: 'media' },
  },
  { name: 'content', type: 'markdown' },
  { name: 'reference' },
  {
    name: 'tags',
    type: 'select',
    endpoint: 'tags',
    isMulti: true,
  },
]
