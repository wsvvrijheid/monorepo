import { SessionUser, User } from '@wsvvrijheid/types'

export const mapSessionUser = (user: User): SessionUser => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    confirmed: user.confirmed,
    blocked: user.blocked,
    name: user.name || user.volunteer?.name || user.applicant?.name,
    avatar: user.avatar?.url,
    roles: (user.role?.type?.split('_') || []) as SessionUser['roles'],
    applicantId: user.applicant?.id,
    volunteerId: user.volunteer?.id,
  }
}
