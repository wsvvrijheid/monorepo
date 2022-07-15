import { RawUser, User } from './user'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'
import { RawTranslator, Translator } from './translator'
import { Juri, RawJuri } from './juri'
import { Author, RawAuthor } from './author'
import { Job, RawJob } from './job'
import { ArtEditor, RawArtEditor } from './art-editor'

export type RawVolunteer = {
  id: number
  username: string
  name: string
  email: string
  bio: string
  occupation: string
  phone: string
  country: string
  availableHours: number
  heardFrom: string
  comment: string
  linkedin: string
  twitter: string
  facebook: string
  instagram: string
  inMailingList: boolean
  approved: boolean
  isPublis: boolean
  user: StrapiRawEntity<RawUser>
  translator: StrapiRawEntity<RawTranslator>
  juri: StrapiRawEntity<RawJuri>
  author: StrapiRawEntity<RawAuthor>
  jobs: StrapiRawCollection<RawJob>
  art_editor: StrapiRawEntity<RawArtEditor>
}

export type Volunteer = {
  id: number
  username: string
  name: string
  email: string
  bio: string
  occupation: string
  phone: string
  country: string
  availableHours: number
  heardFrom: string
  comment: string
  linkedin: string
  twitter: string
  facebook: string
  instagram: string
  inMailingList: boolean
  approved: boolean
  isPublis: boolean
  user: StrapiEntity<User>
  translator: StrapiEntity<Translator>
  juri: StrapiEntity<Juri>
  author: StrapiEntity<Author>
  jobs: StrapiCollection<Job>
  art_editor: StrapiEntity<ArtEditor>
}
