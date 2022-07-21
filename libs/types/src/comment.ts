import { Art } from './art'
import { Blog } from './blog'
import { StrapiEntity } from './strapi'
import { User } from './user'

export type Comment = {
  id: number
  content: string
  name: string
  email: string
  user: StrapiEntity<User>
  blog: StrapiEntity<Blog>
  art: StrapiEntity<Art>
}
