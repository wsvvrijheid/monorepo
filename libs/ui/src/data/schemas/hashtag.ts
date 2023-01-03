import * as yup from 'yup'

import { FormFields } from '../../admin'

export const mainHashtagSchema = yup.object({
  title: yup.string().required('Title is required'),
  date: yup.date().required('Date is required'),
  description: yup.string().required('Description is required'),
  content: yup.string(),
  hashtagDefault: yup.string().required('Hashtag is required'),
  hashtagExtra: yup.string(),
  categories: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
  mentions: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
  image: yup.mixed().required('Image is required'),
})

export type MainHashtagSchemaKeys = keyof yup.InferType<
  typeof mainHashtagSchema
>

export const mainHashtagFields: FormFields<MainHashtagSchemaKeys> = [
  { name: 'title', isRequired: true },
  { name: 'date', type: 'datetime-local', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'content', type: 'textarea' },
  {
    name: 'hashtagDefault',
    label: 'Default Hashtag',
    isRequired: true,
  },
  { name: 'hashtagExtra', label: 'Extra Hashtag' },
  {
    name: 'mentions',
    type: 'select',
    url: 'api/mentions',
    isMulti: true,
  },
  {
    name: 'categories',
    type: 'select',
    url: 'api/categories',
    isMulti: true,
  },
  { name: 'image', type: 'file', isRequired: true },
]
