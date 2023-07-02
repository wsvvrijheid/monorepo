import { RoleType, SessionUser, User } from '@wsvvrijheid/types'

export const mapSessionUser = (user: User): SessionUser => {
  const {
    applicant,
    avatar,
    blocked,
    confirmed,
    email,
    id,
    name,
    role,
    username,
    volunteer,
  } = user

  return {
    id,
    username,
    email,
    confirmed,
    blocked,
    name: name || volunteer?.name || applicant?.name,
    avatar: avatar?.url,
    roles: (role?.type?.split('_') || []) as RoleType[],
    applicantId: applicant?.id,
    volunteerId: volunteer?.id,
  }
}
