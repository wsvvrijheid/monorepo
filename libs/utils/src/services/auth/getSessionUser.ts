import { User } from '@wsvvrijheid/types'

import { request } from '../../lib'
import { mapSessionUser } from '../../util'

export const getSessionUser = async (token: string) => {
  const userData = await request(token)<User>({
    url: 'api/users/me',
  })

  if (!userData?.data) {
    return null
  }

  const user = mapSessionUser(userData.data as User)

  return user
}
