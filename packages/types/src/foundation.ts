import { Asset } from './asset'
import { Contact } from './contact'
import { Platform } from './platform'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

type FoundationBase = {
  email: string
  name: string
  contact?: Contact | null
  bank1?: string | null
  bank2?: string | null
  IBAN1?: string | null
  IBAN2?: string | null
}

type FoundationRelation = {
  volunteers?: Profile[]
  platforms?: Platform[]
  assets?: Asset[]
  boardOfDirectors?: Profile[]
}

type FoundationRelationInput = {
  volunteers?: Array<number>
  platforms?: Array<number>
  assets?: Array<number>
  boardOfDirectors?: Array<number>
}

export type FoundationCreateInput = Partial<FoundationBase> &
  FoundationRelationInput

export type FoundationUpdateInput = Partial<FoundationBase> &
  FoundationRelationInput

export type Foundation = StrapiBase & FoundationBase & FoundationRelation
