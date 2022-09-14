import { Art } from './art'
import { Expand } from './common'
import { StrapiBase } from './strapi'
import { User } from './user'

type ArtistBase = {
  name: string
}

type ArtistRelation = {
  arts?: Array<Art>
  user?: User
}

type ArtistRelationInput = {
  arts?: Array<number>
  user: number
}

export type ArtistCreateInput = Expand<
  ArtistBase & Pick<ArtistRelationInput, 'user'>
>

export type Artist = Expand<StrapiBase & ArtistBase & ArtistRelation>
