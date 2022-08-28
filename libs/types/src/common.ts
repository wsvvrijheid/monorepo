import { StrapiLocale } from './locale'

export type ModelStatus = 'approved' | 'pending' | 'rejected' | null

export type Localize<T> = Record<StrapiLocale, T>

export type MenuType = {
  link?: string
  children?: MenuType[]
} & Localize<string>
