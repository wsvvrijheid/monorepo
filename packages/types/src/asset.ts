import { UploadFile } from './file'
import { Foundation } from './foundation'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

type AssetBase = {
  name: string
  sku: string
  price: number
  location: string
  rules: string
  notes: string
}

type AssetRelation = {
  images?: UploadFile[]
  invoice?: UploadFile | null
  foundation?: Foundation | null
  peopleInCharge?: Profile[]
}

type AssetRelationInput = {
  images?: Array<number>
  invoice?: number
  foundation?: number
  peopleInCharge?: Array<number>
}

export type AssetCreateInput = Partial<AssetBase> & AssetRelationInput

export type AssetUpdateInput = Partial<AssetBase> & AssetRelationInput

export type Asset = StrapiBase & AssetBase & AssetRelation
