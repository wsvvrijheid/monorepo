import * as yup from 'yup'

import { FormFields } from '../../admin'

export const postSchema = yup.object({
  title: yup.string().required('Title is required'),
  reference: yup.string(),
  description: yup.string().required('Description is required'),
  content: yup.string(),
  hashtag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  image: yup.mixed().required('Image is required'),
})

export type PostSchemaKeys = keyof yup.InferType<typeof postSchema>

export const postFields: FormFields<PostSchemaKeys> = [
  { name: 'title', isRequired: true },
  { name: 'reference' },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'content', type: 'textarea' },
  {
    name: 'hashtag',
    type: 'select',
    url: 'api/hashtags',
  },
  { name: 'image', type: 'file', isRequired: true },
]
