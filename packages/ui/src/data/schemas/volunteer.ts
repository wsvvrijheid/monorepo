import * as yup from 'yup'

import { Volunteer } from '@wsvvrijheid/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const volunteerSchema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  jobs: yupMultiSelect,
  email: yup.string().email('Not a valid email').required('Email is required'),
  phone: yup.string(),
  city: yup.string(),
  country: yup.string(),
})
export const volunteerFields: FormFields<Volunteer> = [
  { name: 'name', label: 'Name', isRequired: true },
  { name: 'availableHours', label: 'Available Hours' },
  { name: 'username', label: 'Username', isRequired: true },
  { name: 'email', label: 'Email', isRequired: true },
  {
    name: 'city',
    label: 'City',
  },
  {
    name: 'country',
    label: 'Country',
  },
  {
    name: 'phone',
    label: 'Phone',
  },
  {
    name: 'createdAt',
    type: 'date',
    label: 'Created Date',
  },
  {
    name: 'updatedAt',
    type: 'date',
    label: 'Updated Date',
  },
  { name: 'age', label: 'Age' },
  {
    name: 'jobs',
    type: 'select',
    isMulti: true,
    url: 'api/jobs',
  },
  { name: 'comment', label: 'Comment' },
]
