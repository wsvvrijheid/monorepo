import { SetRequired } from 'type-fest'

import { Author } from './author'
import { Expand } from './common'
import { Editor } from './editor'
import { Job } from './job'
import { Jury } from './jury'
import { StrapiBase } from './strapi'
import { Translator } from './translator'
import { User } from './user'

export type VolunteerBase = {
  username: string
  name: string | null
  email: string
  bio: string | null
  occupation: string | null
  phone: string | null
  country: string | null
  availableHours: number
  heardFrom: string | null
  comment: string | null
  linkedin: string | null
  twitter: string | null
  facebook: string | null
  instagram: string | null
  inMailingList: boolean | null
  approved: boolean | null
  isPublic: boolean | null
}

type VolinteerRelation = {
  user?: User | null
  translator?: Translator | null
  jury?: Jury | null
  author?: Author | null
  jobs?: Array<Job>
  editor?: Editor | null
}

type VolinteerRelationInput = {
  user?: number
  translator?: number
  jury?: number
  author?: number
  jobs?: Array<number>
  editor?: number
}

export type VolunteerCreateInput = Expand<
  SetRequired<
    Partial<Omit<VolunteerBase, 'approved'>>,
    'username' | 'name' | 'email' | 'phone' | 'availableHours'
  > &
    Pick<VolinteerRelationInput, 'jobs' | 'user'>
>

export type VolunteerUpdateInput = Expand<
  Partial<VolunteerBase> & VolinteerRelationInput
>

export type Volunteer = Expand<StrapiBase & VolunteerBase & VolinteerRelation>
