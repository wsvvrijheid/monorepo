import { Application, RawApplication } from './application'
import { RawUser, User } from './user'
import { StrapiEntity, StrapiRawEntity } from './strapi'

export type RawVote = {
  id: number
  value: number
  voter: StrapiRawEntity<RawUser>
  application: StrapiRawEntity<RawApplication>
}

export type Vote = {
  id: number
  value: number
  voter: StrapiEntity<User>
  application: StrapiEntity<Application>
}
