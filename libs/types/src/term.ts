import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'

export type TermBase = Omit<
  StrapiEntityBase,
  'description' | 'translationStatus'
>

type TermRelation = {
  image?: UploadFile
  localizations?: Array<Term>
}

export type Term = Expand<StrapiBase & TermBase & TermRelation>
