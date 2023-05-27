import {
  PublicationState,
  StrapiLocale,
  StrapiModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

export type RequestArgs<T extends StrapiModel> = {
  url: StrapiUrl
  token?: string
  locale?: StrapiLocale
  fields?: (keyof T)[]
  filters?: { [key: string]: unknown }
  populate?: string | string[]
  sort?: string | string[]
  page?: number
  pageSize?: number
  publicationState?: PublicationState
}

export type RequestSingleArgs<T extends StrapiModel> = Pick<
  RequestArgs<T>,
  'url' | 'token' | 'locale' | 'fields' | 'populate' | 'publicationState'
> & { id?: number }
