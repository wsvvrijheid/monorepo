// Only title, description and locale is required for all models

import { Activity, ActivityUpdateInput } from './activity'
import { Announcement, AnnouncementUpdateInput } from './announcement'
import { Art, ArtUpdateInput } from './art'
import { Blog, BlogUpdateInput } from './blog'
import { Collection, CollectionUpdateInput } from './collection'
import { ApprovalStatus, Localize } from './common'
import { Competition, CompetitionUpdateInput } from './competition'
import { UploadFile } from './file'
import { Hashtag, HashtagUpdateInput } from './hashtag'
import { StrapiLocale } from './locale'
import { Post, PostUpdateInput } from './post'

/**
 * TRANSLATION TYPES
 */
export type StrapiTranslatableModel =
  | Activity
  | Announcement
  | Art
  | Blog
  | Collection
  | Competition
  | Hashtag
  | Post

export type StrapiTranslatableUpdateInput =
  | ActivityUpdateInput
  | AnnouncementUpdateInput
  | ArtUpdateInput
  | BlogUpdateInput
  | CollectionUpdateInput
  | CompetitionUpdateInput
  | HashtagUpdateInput
  | PostUpdateInput

export type TranslatableModel<T extends StrapiTranslatableModel> = {
  id: number
  title: string
  description: string | null
  locale: StrapiLocale
  publishedAt?: string | null
  content: string | null
  text?: string
  image?: UploadFile
  approvalStatus?: ApprovalStatus
  localizations?: T[]
}

export type TranslationKey = [StrapiLocale, StrapiLocale]

export type LocalizedModel<T extends StrapiTranslatableModel> = Localize<
  TranslatableModel<T>
>
