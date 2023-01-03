// Only title, description and locale is required for all models

import { Activity, ActivityCreateInput, ActivityUpdateInput } from './activity'
import {
  Announcement,
  AnnouncementCreateInput,
  AnnouncementUpdateInput,
} from './announcement'
import { Art, ArtCreateInput, ArtUpdateInput } from './art'
import { Blog, BlogCreateInput, BlogUpdateInput } from './blog'
import {
  Collection,
  CollectionCreateInput,
  CollectionUpdateInput,
} from './collection'
import { ApprovalStatus, Localize } from './common'
import {
  Competition,
  CompetitionCreateInput,
  CompetitionUpdateInput,
} from './competition'
import { UploadFile } from './file'
import { Hashtag, HashtagCreateInput, HashtagUpdateInput } from './hashtag'
import { StrapiLocale } from './locale'
import { Post, PostCreateInput, PostUpdateInput } from './post'

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

export type StrapiTranslatableCreateInput =
  | ActivityCreateInput
  | AnnouncementCreateInput
  | ArtCreateInput
  | BlogCreateInput
  | CollectionCreateInput
  | CompetitionCreateInput
  | HashtagCreateInput
  | PostCreateInput

export type TranslatableModel<T extends StrapiTranslatableModel> = {
  id: number
  title: string
  description: string | null
  locale: StrapiLocale
  publishedAt?: Date | string | null
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
