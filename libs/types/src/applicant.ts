import { Application, RawApplication } from './application'
import { RawUser, User } from './user'
import { StrapiEntity, StrapiRawEntity } from './strapi'

export type RawApplicant = {
  id: number
  name: string
  application: StrapiRawEntity<RawApplication>
  user: StrapiRawEntity<RawUser>
}

export type Applicant = {
  id: number
  name: string
  application: StrapiEntity<Application>
  user: StrapiEntity<User>
}
