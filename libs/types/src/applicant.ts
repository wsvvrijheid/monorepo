import { Application } from './application'
import { StrapiCore } from './strapi'
import { User } from './user'

export type Applicant = {
  name: string
  application?: Application
  user?: User
} & StrapiCore
