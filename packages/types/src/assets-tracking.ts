import { Asset } from './asset'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

type AssetsTrackingBase = {
  fromLocation: string
  toLocation: string
  date: string
  notes: string
}

type AssetsTrackingRelation = {
  asset?: Asset
  previousTracking?: AssetsTracking
  assignedTo?: Profile
}

type AssetsTrackingRelationInput = {
  asset?: number
  previousTracking?: number
  assignedTo?: number
}

export type AssetsTrackingCreateInput = Partial<AssetsTrackingBase> &
  AssetsTrackingRelationInput

export type AssetsTrackingUpdateInput = Partial<AssetsTrackingBase> &
  AssetsTrackingRelationInput

export type AssetsTracking = StrapiBase &
  AssetsTrackingBase &
  AssetsTrackingRelation
