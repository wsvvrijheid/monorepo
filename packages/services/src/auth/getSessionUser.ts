import axios from 'axios'

import { API_URL } from '@wsvvrijheid/config'
import { User } from '@wsvvrijheid/types'
import { mapSessionUser } from '@wsvvrijheid/utils'

export const getSessionUser = async (token: string) => {
  const userData = await axios('api/users/me', {
    params: { populate: '*' },
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!userData?.data) {
    return null
  }

  const user = mapSessionUser(userData.data as unknown as User)

  return user
}
