import { Request } from '@wsvvrijheid/lib'
import { User } from '@wsvvrijheid/types'
import { mapSessionUser } from '@wsvvrijheid/utils'

export const getSessionUser = async (token: string) => {
  const userData = await Request.single<User>({
    url: 'api/users/me',
    token,
  })

  if (!userData?.data) {
    return null
  }

  const user = mapSessionUser(userData.data as User)

  return user
}
