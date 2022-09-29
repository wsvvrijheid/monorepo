import { User } from '@wsvvrijheid/types'

import { Request } from '../../lib'
import { mapSessionUser } from '../../util'

export const getSessionUser = async (token: string) => {
  const userData = await Request.single<User>({
    url: 'api/users/me',
    token,
  })

  console.log('userData', userData)

  if (!userData?.data) {
    return null
  }

  const user = mapSessionUser(userData.data as User)

  return user
}
