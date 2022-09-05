import { SessionUser, User } from '@wsvvrijheid/types'

export const mapSessionUser = (user: User): SessionUser => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    confirmed: user.confirmed,
    blocked: user.blocked,
    name: user.volunteer?.name || user.artist?.name || user.applicant?.name,
    avatar: user.avatar?.url,
    isAuthenticated:
      user.role?.name === 'Authenticated' || user.role?.name === 'Admin',
    isAdmin: user.role?.name === 'Admin',
    artistId: user.artist?.id,
    authorId: user.volunteer?.author?.id,
    applicantId: user.applicant?.id,
    artEditorId: user.volunteer?.artEditor?.id,
    juryId: user.volunteer?.jury?.id,
    translatorId: user.volunteer?.translator?.id,
    volunteerId: user.volunteer?.id,
  }
}
