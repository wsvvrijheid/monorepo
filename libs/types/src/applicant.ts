import { Application } from './application'
import { Expand } from './common'
import { StrapiCore } from './strapi'
import { User } from './user'

export type ApplicantBase = {
  name: string
}

type AplicantRelation = {
  application?: Application
  user?: User
}

type ApplicantRelationInput = {
  application: number
  user: number
}

export type ApplicantCreateInput = Expand<
  ApplicantBase & ApplicantRelationInput
>

export type Applicant = Expand<StrapiCore & ApplicantBase & AplicantRelation>
