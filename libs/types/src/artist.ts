import { Art, RawArt } from './art'
import { RawUser, User } from './user'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawArtist = {
  id: number
  name: string
  arts: StrapiRawCollection<RawArt>
  user: StrapiRawEntity<RawUser>
}

export type Artist = {
  id: number
  name: string
  arts: StrapiCollection<Art>
  user: StrapiEntity<User>
}
