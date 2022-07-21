import { ArtFeedback } from './art-feedback'
import { Artist } from './artist'
import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { UploadFile } from './file'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type Art = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  images: StrapiCollection<UploadFile>
  status: 'pending' | 'rejected' | 'approved'
  previousStatus: 'pending' | 'rejected' | 'approved' | null
  likes: number
  views: number
  locale: string
  artist?: StrapiEntity<Artist>
  categories?: StrapiCollection<Category>
  tags?: StrapiCollection<Tag>
  feedbacks?: StrapiCollection<ArtFeedback>
  likers?: StrapiCollection<User>
  collection?: StrapiEntity<Collection>
  comments?: StrapiCollection<Comment>
  localizations?: StrapiCollection<Art>
  createdAt: string
  publishedAt: string
  updatedAt: string
}
