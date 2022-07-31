import { Art } from './art'
import { Blog } from './blog'
import { StrapiCore } from './strapi'
import { User } from './user'

export type Comment = {
  content: string
  name: string | null
  email: string | null
  user?: User | null
  blog?: Blog | null
  art?: Art | null
} & StrapiCore
