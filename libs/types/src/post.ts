import { RawUploadFile, UploadFile } from './file'
import { Hashtag, RawHashtag } from './hashtag'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'
import { RawTag, Tag } from './tag'
import { RawTranslator, Translator } from './translator'
import { RawUser, User } from './user'

export type RawPost = {
  id: number
  text: string
  twitterMedia: string
  slug: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  creator: StrapiRawEntity<RawUser>
  hashtag: StrapiRawEntity<RawHashtag>
  image: StrapiRawEntity<RawUploadFile>
  localizations: StrapiRawCollection<RawPost>
  tags: StrapiRawCollection<RawTag>
  translator: StrapiRawEntity<RawTranslator>
}

export type Post = {
  id: number
  text: string
  twitterMedia: string
  slug: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  creator: StrapiEntity<User>
  hashtag: StrapiEntity<Hashtag>
  image: StrapiEntity<UploadFile>
  localizations: StrapiCollection<Post>
  tags: StrapiCollection<Tag>
  translator: StrapiEntity<Translator>
}
