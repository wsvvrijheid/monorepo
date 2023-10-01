import { RoleType, SessionUser, User } from '@wsvvrijheid/types'

export const mapSessionUser = (user: User): SessionUser => {
  const { role, ...rest } = user

  return {
    ...rest,
    roles: (role?.type?.split('_') || []) as RoleType[],
  }
}
