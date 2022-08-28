import { ArtEditor } from './art-editor'
import { Author } from './author'
import { Job } from './job'
import { Jury } from './jury'
import { StrapiCore } from './strapi'
import { Translator } from './translator'
import { User } from './user'

export type Volunteer = {
  username: string
  name: string | null
  email: string
  bio: string | null
  occupation: string | null
  phone: string | null
  country: string | null
  availableHours: number
  heardFrom: string | null
  comment: string | null
  linkedin: string | null
  twitter: string | null
  facebook: string | null
  instagram: string | null
  inMailingList: boolean
  approved: boolean
  isPublic: boolean | null
  user?: User | null
  translator?: Translator | null
  jury?: Jury | null
  author?: Author | null
  jobs?: Array<Job>
  artEditor?: ArtEditor | null
} & StrapiCore
