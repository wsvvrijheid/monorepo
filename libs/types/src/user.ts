import { Applicant } from './applicant'
import { Expand } from './common'
import { UploadFile } from './file'
import { LangRole } from './lang-role'
import { Role } from './role'
import { StrapiBase } from './strapi'
import { Volunteer } from './volunteer'

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
  langRoles?: Array<LangRole>
  volunteer?: Volunteer | null
}

type UserRelationInput = {
  role?: number
  avatar?: File
  applicant?: number
  volunteer?: number | null
}

export type UpdateUserInput = Expand<
  Partial<Omit<UserBase, 'provider'> & UserRelationInput> & { token: string }
>

export type User = Omit<StrapiBase, 'publishedAt'> & UserBase & UserRelation
