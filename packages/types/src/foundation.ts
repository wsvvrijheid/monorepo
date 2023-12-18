import { Asset } from './asset'
import { Contact } from './contact'
import { UploadFile } from './file'
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
  KVK: string
  BIC: string
  RSIN: string
  policy_plan: UploadFile
  substantive_financial_annual_report: UploadFile
  remuneration_policy: UploadFile
}

type FoundationRelation = {
  volunteers?: Profile[]
  chairman?: Profile
  secretary?: Profile
  accountant?: Profile
  platforms?: Platform[]
  assets?: Asset[]
  boardOfDirectors?: Profile[]
}

type FoundationRelationInput = {
  volunteers?: Array<number>
  chairman?: Profile
  secretary?: Profile
  accountant?: Profile
  platforms?: Array<number>
  assets?: Array<number>
  boardOfDirectors?: Array<number>
}

export type FoundationCreateInput = Partial<FoundationBase> &
  FoundationRelationInput

export type FoundationUpdateInput = Partial<FoundationBase> &
  FoundationRelationInput

export type Foundation = StrapiBase & FoundationBase & FoundationRelation
