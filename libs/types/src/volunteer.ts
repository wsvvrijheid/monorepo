import { SetRequired } from 'type-fest'

import { ArtEditor } from './art-editor'
import { Author } from './author'
import { Expand } from './common'
import { Job } from './job'
import { Jury } from './jury'
import { StrapiCore } from './strapi'
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
  inMailingList: boolean
  approved: boolean
  isPublic: boolean | null
}

type VolinteerRelation = {
  user?: Omit<User, 'volunteer'> | null
  translator?: Omit<Translator, 'volunteer'> | null
  jury?: Jury | null
  author?: Omit<Author, 'volunteer'> | null
  jobs?: Array<Job>
  artEditor?: Omit<ArtEditor, 'volunteer'> | null
}

type VolinteerRelationInput = {
  user?: number
  translator?: number
  jury?: number
  author?: number
  jobs?: number[]
  artEditor?: number
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

export type Volunteer = Expand<StrapiCore & VolunteerBase & VolinteerRelation>
