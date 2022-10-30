import { API_URL } from '@wsvvrijheid/config'
import { Auth, AuthResponse } from '@wsvvrijheid/types'
import axios from 'axios'

import { getSessionUser } from './getSessionUser'

const emptyAuth: Auth = {
  user: null,
  isLoggedIn: false,
  token: null,
}

export const getAuth: (
  identifier: string,
  password: string,
) => Promise<Auth> = async (identifier: string, password: string) => {
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

  const auth: Auth = { user, token, isLoggedIn: true }

  return auth
}
