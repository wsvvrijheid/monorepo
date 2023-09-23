import axios from 'axios'

import { API_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { Profile, User } from '@wsvvrijheid/types'
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

  const profileResponse = await strapiRequest<Profile>({
    endpoint: 'profiles',
    filters: {
      user: { id: userData.data.id },
    },
  })

  const profile = profileResponse?.data?.[0] || null

  const user = mapSessionUser(userData.data as unknown as User, profile)

  return user
}
