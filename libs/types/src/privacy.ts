import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'

export type PrivacyBase = Omit<
  StrapiEntityBase,
  'description' | 'translationStatus'
>

type PrivacyRelation = {
  image?: UploadFile
  localizations?: Array<Privacy>
}

export type Privacy = StrapiBase & PrivacyBase & PrivacyRelation
