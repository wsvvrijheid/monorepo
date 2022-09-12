import { SetRequired } from 'type-fest'

import { Art } from './art'
import { Expand } from './common'
import { StrapiCore } from './strapi'
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
  user?: number
}

export type ArtistCreateInput = Expand<
  ArtistBase & Pick<SetRequired<ArtistRelationInput, 'user'>, 'user'>
>

export type Artist = Expand<StrapiCore & ArtistBase & ArtistRelation>
