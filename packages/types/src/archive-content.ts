import { Category } from './category'
import { Expand } from './common'
import { StrapiBase } from './strapi'
import { Tag } from './tag'

export type ArchiveContentBase = {
  source: string
  link: string
  content: string
}

type ArchiveContentRelation = {
  categories?: Category[]
  tags?: Tag[]
}

type ArchiveContentRelationInput = {
  categories: number[]
  tags: number[]
}

export type ArchiveContentCreateInput = Expand<
  { publishedAt?: Date | string | null } & ArchiveContentBase &
    ArchiveContentRelationInput
>

export type ArchiveContentUpdateInput = ArchiveContentCreateInput

export type ArchiveContent = StrapiBase &
  ArchiveContentBase &
  ArchiveContentRelation
