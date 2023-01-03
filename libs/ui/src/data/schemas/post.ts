import * as yup from 'yup'

import { FormFields } from '../../admin'

export const postSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string(),
  hashtag: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .default(undefined)
    .required(),
  image: yup.mixed().required('Image is required'),
  reference: yup.string(),
})

export type PostSchemaKeys = keyof yup.InferType<typeof postSchema>

export const postFields: FormFields<PostSchemaKeys> = [
  { name: 'title', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'reference' },
  { name: 'content', type: 'textarea' },
  {
    name: 'hashtag',
    type: 'select',
    url: 'api/hashtags',
    isRequired: true,
  },
  { name: 'image', type: 'file', isRequired: true },
]
