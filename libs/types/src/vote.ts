import { Application } from './application'
import {} from './strapi'
import { User } from './user'

export type Vote = {
  id: number
  value: number
  voter?: User
  application?: Application
}
