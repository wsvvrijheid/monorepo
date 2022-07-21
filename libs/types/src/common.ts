import { StrapiLocale } from './locale'

export type Localize<T> = Record<StrapiLocale, T>

export type ChildMenu = {
  link: string
} & Localize<string>

export type ParentMenu = {
  link?: string
  children: ChildMenu[]
} & Localize<string>
