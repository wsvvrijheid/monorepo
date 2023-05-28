import { Applicant } from './applicant'
import { Comment } from './comment'
import { Expand } from './common'
import { UploadFile } from './file'
import { LangRole } from './lang-role'
import { Role } from './role'
import { StrapiBase } from './strapi'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type UserBase = {
  name: string | null
  email: string
  username: string
  blocked: boolean
  confirmed: boolean
  provider: string
  langRoles?: Array<LangRole>
}

type UserRelation = {
  role?: Role
  avatar?: UploadFile | null
  applicant?: Applicant | null
  comments?: Array<Comment>
  langRoles?: Array<LangRole>
  volunteer?: Volunteer | null
  votes?: Array<Vote>
}

type UserRelationInput = {
  role?: number
  avatar?: File
  applicant?: number
  comments?: Array<number>
  volunteer?: number | null
  votes?: Array<number>
}

export type UpdateUserInput = Expand<
  Partial<Omit<UserBase, 'provider'> & UserRelationInput>
>

export type User = Omit<StrapiBase, 'publishedAt'> & UserBase & UserRelation