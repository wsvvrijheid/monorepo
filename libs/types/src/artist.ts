import { Art } from './art'
import { StrapiCollection, StrapiEntity } from './strapi'
import { User } from './user'

export type Artist = {
  id: number
  name: string
  arts: StrapiCollection<Art>
  user: StrapiEntity<User>
}
