import * as yup from 'yup'

import { Volunteer } from '@wsvvrijheid/types'

import { yupMultiSelect, yupSelect } from './common'
import { FormFields } from '../../admin'

export const volunteerSchema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  jobs: yupMultiSelect,
  user: yupSelect,
  email: yup.string().email('Not a valid email').required('Email is required'),
  phone: yup.string(),
  city: yup.string(),
  country: yup.string(),
  platforms: yupMultiSelect,
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
  {
    name: 'user',
    type: 'select',
    url: 'api/users',
  },
  { name: 'comment', label: 'Comment' },
  {
    name: 'platform',
    type: 'select',
    isMulti: true,
    url: 'api/platforms',
  },
]
