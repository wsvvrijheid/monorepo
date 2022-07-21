import { Application } from './application'
import { StrapiEntity } from './strapi'
import { User } from './user'

export type Vote = {
  id: number
  value: number
  voter: StrapiEntity<User>
  application: StrapiEntity<Application>
}
