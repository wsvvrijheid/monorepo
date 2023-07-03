import {
  Sort,
  StrapiCollectionUrl,
  StrapiLocale,
  StrapiSingleUrl,
} from '@wsvvrijheid/types'

export type RequestCommonArgs = {
  fields?: string[]
  includeDrafts?: boolean
  populate?: string | string[]
  token?: string
}

export type RequestCollectionArgs = RequestCommonArgs & {
  filters?: { [key: string]: unknown }
  locale?: StrapiLocale
  page?: number
  pageSize?: number
  sort?: Sort
  url: StrapiCollectionUrl
}

export type RequestByIdArgs = RequestCommonArgs & {
  id: number
  url: StrapiCollectionUrl
}

export type SingleTypeArgs = RequestCommonArgs & {
  url: StrapiSingleUrl
  locale?: StrapiLocale
}

export type RequestSingleArgs = RequestByIdArgs | SingleTypeArgs
