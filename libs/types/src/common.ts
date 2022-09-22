import { SetRequired } from 'type-fest'

import { StrapiLocale } from './locale'

export type TranslationStatus = 'approved' | 'pending' | 'rejected' | 'original'
export type ApprovalStatus = 'approved' | 'pending' | 'rejected'

export type Localize<T> = Record<StrapiLocale, T>

export type MenuType = {
  link?: string
  children?: MenuType[]
} & Localize<string>

// Ref: https://stackoverflow.com/a/57683652/8206907
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type PickRequired<T, K extends keyof T> = Expand<
  Pick<SetRequired<T, K>, K>
>
