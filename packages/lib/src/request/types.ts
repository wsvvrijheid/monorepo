import {
  Sort,
  StrapiCollectionEndpoint,
  StrapiEndpoint,
  StrapiLocale,
  StrapiSingleEndpoint,
} from '@wsvvrijheid/types'

export type RequestCommonArgs = {
  fields?: string[]
  includeDrafts?: boolean
  populate?: string | string[]
  token?: string
  sort?: Sort
}

export type RequestCollectionArgs = RequestCommonArgs & {
  filters?: { [key: string]: unknown }
  locale?: StrapiLocale
  page?: number
  pageSize?: number
  endpoint: StrapiCollectionEndpoint
}

export type RequestByIdArgs = RequestCommonArgs & {
  id: number
  endpoint: StrapiEndpoint
}

export type SingleTypeArgs = RequestCommonArgs & {
  endpoint: StrapiSingleEndpoint
  locale?: StrapiLocale
}

export type RequestSingleArgs = RequestByIdArgs | SingleTypeArgs
