import { LangRole, RawLangRole } from './lang-role'
import { Post, RawPost } from './post'
import { RawVolunteer, Volunteer } from './volunteer'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawTranslator = {
  id: number
  posts: StrapiRawCollection<RawPost>
  roles: StrapiRawCollection<RawLangRole>
  volunteer: StrapiRawEntity<RawVolunteer>
}

export type Translator = {
  id: number
  posts: StrapiCollection<Post>
  roles: StrapiCollection<LangRole>
  volunteer: StrapiEntity<Volunteer>
}
