import * as yup from 'yup'

import { User } from '@wsvvrijheid/types'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

export const useUserSchema = () => {
  return yup.object({
    avatar: yup.string(),
    name: yup.string().required(),
    username: yup.string().required(),
    role: yupSelect,
    email: yup.string().email().required(),
  })
}

export const userFields: FormFields<User> = [
  { name: 'name', label: 'Name', isRequired: true },
  { name: 'email', label: 'Email', isRequired: true },
  { name: 'username', label: 'Username', isRequired: true },
  {
    name: 'volunteer',
    label: 'Volunteer',
    type: 'select',
    url: 'api/volunteers',
  },
  { name: 'avatar', isRequired: true, type: 'file' },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    url: 'api/roles',
  },
]
