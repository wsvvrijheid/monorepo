import { Application, RawApplication } from './application'
import { Category, RawCategory } from './category'
import { RawUploadFile, UploadFile } from './file'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawCompetition = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  image: StrapiRawEntity<RawUploadFile>
  date: string
  dateEnd: string
  locale: string
  applications: StrapiRawCollection<RawApplication>
  categories: StrapiRawCollection<RawCategory>
  localizations: StrapiRawCollection<RawCompetition>
  createdAt: string
  publishedAt: string
  updatedAt: string
}

export type Competition = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  image: StrapiEntity<UploadFile>
  date: string
  dateEnd: string
  locale: string
  applications: StrapiCollection<Application>
  categories: StrapiCollection<Category>
  localizations: StrapiCollection<Competition>
  createdAt: string
  publishedAt: string
  updatedAt: string
}
