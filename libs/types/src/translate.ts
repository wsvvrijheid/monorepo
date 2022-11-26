// Only title, description and locale is required for all models

import { Activity } from './activity'
import { Announcement } from './announcement'
import { Art } from './art'
import { Blog } from './blog'
import { ApprovalStatus, Localize } from './common'
import { Competition } from './competition'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { StrapiLocale } from './locale'
import { Post } from './post'

/**
 * TRANSLATION TYPES
 */
export type StrapiTranslatableModel =
  | Activity
  | Announcement
  | Art
  | Blog
  | Competition
  | Hashtag
  | Post

export type TranslatableModel<T extends StrapiTranslatableModel> = {
  id: number
  title: string
  description: string | null
  locale: StrapiLocale
  publishedAt?: string | null
  content: string | null
  text?: string
  image?: UploadFile
  images?: UploadFile[]
  approvalStatus?: ApprovalStatus
  localizations?: T[]
}

export type TranslationKey = [StrapiLocale, StrapiLocale]

export type LocalizedModel<T extends StrapiTranslatableModel> = Localize<
  TranslatableModel<T>
>
