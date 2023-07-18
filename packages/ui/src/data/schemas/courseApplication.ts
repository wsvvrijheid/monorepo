import * as yup from 'yup'

import { CourseApplication } from '@wsvvrijheid/types'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

export const courseApplicationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Not a valid email').required('Email is required'),
  city: yup.string(),
  country: yup.string().required('Country is required'),
  phone: yup.string().required('Phone is required'),
  message: yup.string().required('Message is required'),
  hasPaid: yup.boolean(),
  course: yupSelect,
})

export const courseApplicationFields: FormFields<CourseApplication> = [
  { name: 'name', isRequired: true },
  { name: 'email', isRequired: true },
  { name: 'city' },
  { name: 'country', isRequired: true },
  { name: 'phone', isRequired: true },
  { name: 'hasPaid', type: 'boolean' },
  { name: 'message', isRequired: true, type: 'textarea' },
  {
    name: 'course',
    type: 'select',
    url: 'api/courses',
  },
]
