import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'

export type TermBase = Omit<StrapiEntityBase, 'description' | 'approvalStatus'>

type TermRelation = {
  image?: UploadFile | null
  localizations?: Array<Term>
}

export type Term = StrapiBase & TermBase & TermRelation
