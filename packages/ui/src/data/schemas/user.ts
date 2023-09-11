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
  { name: 'name', isRequired: true },
  { name: 'email', isRequired: true },
  { name: 'username', isRequired: true },
  {
    name: 'volunteer',
    type: 'select',
    endpoint: 'volunteers',
  },
  { name: 'avatar', isRequired: true, type: 'file' },
  {
    name: 'role',
    type: 'select',
    endpoint: 'roles',
  },
]
