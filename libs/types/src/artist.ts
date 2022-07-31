import { Art } from './art'
import { StrapiCore } from './strapi'
import { User } from './user'

export type Artist = {
  name: string
  arts?: Array<Art>
  user?: User
} & StrapiCore
