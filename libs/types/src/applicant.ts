import { Application } from './application'
import { StrapiEntity } from './strapi'
import { User } from './user'

export type Applicant = {
  id: number
  name: string
  application: StrapiEntity<Application>
  user: StrapiEntity<User>
}
