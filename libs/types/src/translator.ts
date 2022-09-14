import { Expand } from './common'
import { LangRole } from './lang-role'
import { Post } from './post'
import { StrapiBase } from './strapi'
import { Volunteer } from './volunteer'

export type TranslatorRelation = {
  posts?: Array<Post>
  roles?: Array<LangRole>
  volunteer?: Volunteer
}

export type TranslatorRelationInput = {
  posts?: Array<number>
  roles: Array<number>
  volunteer: number
}

export type TranslatorCreateInput = TranslatorRelationInput

export type Translator = Expand<StrapiBase & TranslatorRelation>
