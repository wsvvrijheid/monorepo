import { ArtFeedback, RawArtFeedback } from './art-feedback'
import { Artist, RawArtist } from './artist'
import { Category, RawCategory } from './category'
import { Collection, RawCollection } from './collection'
import { RawUploadFile, UploadFile } from './file'
import { RawTag, Tag } from './tag'
import { RawUser, User } from './user'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'
import { RawComment, Comment } from './comment'

export type RawArt = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  images: StrapiRawCollection<RawUploadFile>
  status: 'pending' | 'rejected' | 'approved'
  previousStatus: 'pending' | 'rejected' | 'approved'
  likes: number
  views: number
  locale: string
  artist: StrapiRawEntity<RawArtist>
  categories: StrapiRawCollection<RawCategory>
  tags: StrapiRawCollection<RawTag>
  feedbacks: StrapiRawCollection<RawArtFeedback>
  likers: StrapiRawCollection<RawUser>
  collection: StrapiRawEntity<RawCollection>
  comments: StrapiRawCollection<RawComment>
  localizations: StrapiRawCollection<RawArt>
  createdAt: string
  publishedAt: string
  updatedAt: string
}

export type Art = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  images: StrapiCollection<UploadFile>
  status: 'pending' | 'rejected' | 'approved'
  previousStatus: 'pending' | 'rejected' | 'approved'
  likes: number
  views: number
  locale: string
  artist: StrapiEntity<Artist>
  categories: StrapiCollection<Category>
  tags: StrapiCollection<Tag>
  feedbacks: StrapiCollection<ArtFeedback>
  likers: StrapiCollection<User>
  collection: StrapiEntity<Collection>
  comments: StrapiCollection<Comment>
  localizations: StrapiCollection<Art>
  createdAt: string
  publishedAt: string
  updatedAt: string
}
