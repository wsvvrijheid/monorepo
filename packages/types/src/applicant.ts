import { Application } from './application'
import { Expand } from './common'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type ApplicantBase = {
  name: string
}

type AplicantRelation = {
  application?: Application
  profile?: Profile
}

type ApplicantRelationInput = {
  application: number
}

export type ApplicantCreateInput = Expand<
  { publishedAt?: Date | string | null } & ApplicantBase &
    ApplicantRelationInput
>

export type Applicant = StrapiBase & ApplicantBase & AplicantRelation
