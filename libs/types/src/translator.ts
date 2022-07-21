import { LangRole } from './lang-role'
import { Post } from './post'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Volunteer } from './volunteer'

export type Translator = {
  id: number
  posts: StrapiCollection<Post>
  roles: StrapiCollection<LangRole>
  volunteer: StrapiEntity<Volunteer>
}
