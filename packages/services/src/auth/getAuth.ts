import axios from 'axios'

import { API_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { Auth, AuthResponse, Profile } from '@wsvvrijheid/types'

import { getSessionUser } from './getSessionUser'

const emptyAuth: Auth = {
  user: null,
  isLoggedIn: false,
  token: null,
  profile: null,
  profileId: null,
}

export const getAuth = async (identifier: string, password: string) => {
  // TODO Can we populate the AuthResponse with the user data from the backend?
  // Why do we need to make a new request to get populated user data?
  const response = await axios.post<AuthResponse>(
    'api/auth/local',
    { identifier, password },
    { baseURL: API_URL },
  )

  const token = response.data?.jwt

  if (!token) {
    return emptyAuth
  }

  const user = await getSessionUser(token)

  if (!user) {
    return emptyAuth
  }

  const profileResponse = await strapiRequest<Profile>({
    endpoint: 'profiles',
    filters: {
      user: { id: user.id },
    },
  })

  const profile = profileResponse?.data?.[0] || null

  const auth: Auth = {
    user,
    token,
    isLoggedIn: true,
    profile,
    profileId: profile?.id || null,
  }

  return auth
}
