import { LangRole } from './lang-role'
import { Post } from './post'
import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'

export type Translator = {
  posts?: Array<Post>
  roles?: Array<LangRole>
  volunteer?: Volunteer
} & StrapiCore
