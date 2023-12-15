import { UploadFile } from './file'
import { StrapiBase } from './strapi'

export type Flow = {
  title: string
  duration: string
  presenter: string
}

export type PresentationBase = {
  slug: string
  title: string
  description: string
  content: string
  date: string
  address: string
  place: string
  flow: Flow[]
}

export type PresentationRelation = {
  image: UploadFile
  images: UploadFile[]
}

export type Presentation = StrapiBase & PresentationBase & PresentationRelation
