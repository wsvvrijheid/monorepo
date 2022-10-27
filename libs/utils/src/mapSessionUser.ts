import { SessionUser, User } from '@wsvvrijheid/types'

export const mapSessionUser = (user: User): SessionUser => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    confirmed: user.confirmed,
    blocked: user.blocked,
    name: user.volunteer?.name || user.applicant?.name,
    avatar: user.avatar?.url,
    isAuthenticated: user.role?.type !== 'public',
    isAdmin: user.role?.name === 'Admin',
    isEditor: user.role?.type.includes('editor'),
    isAuthor: user.role?.type.includes('author'),
    applicantId: user.applicant?.id,
    isJury: user.role?.type.includes('jury'),
    isTranslator: user.role?.type.includes('translator'),
    volunteerId: user.volunteer?.id,
  }
}
