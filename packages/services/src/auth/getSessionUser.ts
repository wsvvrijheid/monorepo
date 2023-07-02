import { strapiRequest } from '@wsvvrijheid/lib'
import { User } from '@wsvvrijheid/types'
import { mapSessionUser } from '@wsvvrijheid/utils'

export const getSessionUser = async (token: string) => {
  const userData = await strapiRequest<User>({
    url: 'api/users/me',
    token,
    populate: '*',
  })

  if (!userData?.data) {
    return null
  }

  const user = mapSessionUser(userData.data as unknown as User)

  return user
}
