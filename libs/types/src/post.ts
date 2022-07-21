import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Tag } from './tag'
import { Translator } from './translator'
import { User } from './user'

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
