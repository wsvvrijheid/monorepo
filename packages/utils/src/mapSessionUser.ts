import { Profile, RoleType, SessionUser, User } from '@wsvvrijheid/types'

export const mapSessionUser = (
  user: User,
  profile: Profile | null,
): SessionUser => {
  const { blocked, confirmed, email, id, role, username } = user

  return {
    id,
    username,
    email,
    confirmed,
    blocked,
    roles: (role?.type?.split('_') || []) as RoleType[],
    profileId: profile?.id,
  }
}
