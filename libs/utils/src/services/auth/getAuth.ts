import { API_URL } from '@wsvvrijheid/config'
import { SessionUser } from '@wsvvrijheid/types'
import { Auth } from '@wsvvrijheid/types'
import axios from 'axios'

export const getAuth: (
  identifier: string,
  password: string,
) => Promise<Auth | undefined> = async (
  identifier: string,
  password: string,
) => {
  const response = await axios.post(`${API_URL}/api/auth/local`, {
    identifier,
    password,
  })

  const token = response.data.jwt
  const userId = response.data.user?.ids

  if (token) {
    const response = await axios.get(
      `${API_URL}/api/users/${userId}?populate=*`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    const user: SessionUser = {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      volunteer: response.data.volunteer,
      avatar: response.data.avatar,
      artist: response.data.artist,
    }

    const auth: Auth = { user, token, isLoggedIn: true }

    return auth
  }
  return
}
